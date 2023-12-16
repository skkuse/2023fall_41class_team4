#include <stdio.h>
#include <stdlib.h>
#include <sys/resource.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <signal.h>
#include <sys/mman.h>

pid_t child_pid;
int timeout_flag;

// 알람 시그널 핸들러 함수
void exit_on_timeout(int signo)
{
    timeout_flag = 1;
    kill(child_pid, SIGKILL);
}

int main(int argc, char* argv[])
{
    int status;
    long runtime_s = 0, runtime_us = 0, memusage = 0;

    child_pid = fork();
    if (child_pid == -1) {
        perror("fork");
        exit(1);
    }

    if (child_pid == 0) {
        // 자식 프로세스 코드
        // 여기에서 실행할 파일을 지정하고 실행

        // Java 프로그램 stdout 출력 숨기기 및 에러 로깅
        freopen("/dev/null", "w", stdout);
        freopen("error.log", "w", stderr);
        
        char* child_argv[] = { "java", argv[1], NULL };
        execvp(child_argv[0], child_argv);

        // is it reachable?
        perror("execvp");
        char cmd[32];
        sprintf(cmd, "cat /proc/%d/status", getpid());
        system(cmd);

        printf("child end: %d\n", getpid());
        exit(1);
    }

    // 부모 프로세스 코드
    // 자식 프로세스의 종료를 기다림

    signal(SIGALRM, exit_on_timeout);
    alarm(3);
    
    struct rusage ru_child;
    wait4(child_pid, &status, 0, &ru_child);
    alarm(0);

    runtime_s += ru_child.ru_utime.tv_sec + ru_child.ru_stime.tv_sec;
    runtime_us += ru_child.ru_utime.tv_usec + ru_child.ru_stime.tv_usec;
    memusage += ru_child.ru_maxrss;

    runtime_s += runtime_us / 1000000;
    runtime_us = runtime_us % 1000000;
    double runtime = (double)runtime_s + (double)(runtime_us) / 1000000;

    // 시간 제한 초과
    if (runtime >= 2.9 || timeout_flag == 1) {
        // printf("2 %lf %d\n", runtime, timeout_flag); // timeout flag check
        printf("2 %lf\n", runtime);
        exit(0);
    }

    // 런타임 에러 발생
    if (!WIFEXITED(status) || WEXITSTATUS(status) != 0) {
        printf("1\n");
        exit(0);
    }

    printf("0 %.6lf %ld", runtime, memusage);

    return 0;
}
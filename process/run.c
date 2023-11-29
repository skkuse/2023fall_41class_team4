#include <stdio.h>
#include <stdlib.h>
#include <sys/resource.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char* argv[])
{
    pid_t child_pid;
    int status;
    int iter = argc == 3 ? atoi(argv[2]) : 1;
    long total_runtime_s = 0, total_runtime_us = 0, total_memusage = 0;

    for (int i = 0; i < iter; i++) {

        child_pid = fork();
        if (child_pid == -1) {
            perror("fork");
            exit(1);
        }

        if (child_pid == 0) {
            // 자식 프로세스 코드
            // 여기에서 실행할 파일을 지정하고 실행

            char* child_argv[] = { "java", argv[1], NULL };
            execvp(child_argv[0], child_argv);

            // // execvp가 실패했을 때 실행되는 코드
            perror("execvp");

            // is it reachable?
            char cmd[32];
            sprintf(cmd, "cat /proc/%d/status", getpid());
            system(cmd);

            printf("child end: %d\n", getpid());
            exit(1);
        } else {
            // 부모 프로세스 코드
            // 자식 프로세스의 종료를 기다림
            struct rusage ru_child;

            wait4(child_pid, &status, 0, &ru_child);

            if (!WIFEXITED(status)) {
                printf("0 runtime_error\n");
                exit(1);
            }

            total_runtime_s += ru_child.ru_utime.tv_sec + ru_child.ru_stime.tv_sec;
            total_runtime_us += ru_child.ru_utime.tv_usec + ru_child.ru_stime.tv_usec;
            total_memusage += ru_child.ru_maxrss;
        }
    }

    long mean_runtime_s = (total_runtime_s / iter) + (total_runtime_us / iter) / 1000000;
    long mean_runtime_us = (total_runtime_us / iter) % 1000000;
    double mean_runtime = (double)(mean_runtime_s) + (double)(mean_runtime_us) / 1000000;
    long mean_memusage = total_memusage / iter;
    printf("1 %.6lf %ld", mean_runtime, mean_memusage);

    return 0;
}

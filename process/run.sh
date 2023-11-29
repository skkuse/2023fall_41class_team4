#!/bin/bash


# input file path를 argument로 넘겨 받고 file path 변수에 저장하기
input_path="./Input.java"
if [ "$#" -eq 1 ]; then
    input_path=$1
fi
result="./result.txt"

# 컴파일
compile_result=$(javac -d . $input_path 2>&1)
if [ $? -ne 0 ]; then
    # 컴파일 에러 발생
    echo "0 compile_error $compile_result" > $result
    exit 1
fi

# 실행 및 결과 분석
opt=$(basename "${input_path%.java}")
run_result=$(./run $opt)
IFS=' ' read -r status_code result_type result_message <<< "$run_result"
    
echo $status_code $result_type $result_message > $result
# status code에 따른 분기
# if [ "$status_code" -eq 1 ]; then
#     # status code가 1인 경우
#     echo "$(./calculate "$runtime" "$memory_usage")" > emission
# fi

# 결과 저장

rm "${input_path%.java}.class"
#!/bin/bash

# input file path를 argument로 넘겨 받고 file path 변수에 저장하기
input_path="./Input.java"
if [ "$#" -eq 1 ]; then
    input_path=$1
fi
result="./result.txt"
execute_path=${input_path%.java}


# 실행 및 결과 분석
opt=$(basename $execute_path)
run_result=$(./run $opt)
IFS=' ' read -r status_code result_type result_message <<< "$run_result"
    
echo $status_code $result_type $result_message > $result
echo $status_code

rm "$execute_path.class"
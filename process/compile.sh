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
    echo 0 # 에러
    exit 1
fi

echo 1 # 성공
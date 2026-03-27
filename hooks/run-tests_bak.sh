#!/bin/bash
# run-tests.sh
# 在对话结束时运行测试
#
# 作为 Stop hook，在 Claude 对话结束时运行

export PATH="$HOME/bin:/usr/local/bin:$PATH"

echo "DEBUG: Running tests..." >&2

# 切换到项目目录
cd /home/ehuamay/workspace/proA || exit 0

# 检查是否有测试文件
if ! ls test_*.py *_test.py tests/*.py 2>/dev/null | head -1 > /dev/null; then
    echo "DEBUG: No test files found, skipping" >&2
    echo '{"hookSpecificOutput": {"hookEventName": "Stop", "additionalContext": "No tests to run"}}'
    exit 0
fi

# 运行 pytest
TEST_OUTPUT=$(python -m pytest -v --tb=short 2>&1)
TEST_EXIT_CODE=$?

# 转义 JSON 特殊字符
TEST_OUTPUT_ESCAPED=$(echo "$TEST_OUTPUT" | jq -Rs '.')

if [ $TEST_EXIT_CODE -eq 0 ]; then
    cat <<EOF
{
    "hookSpecificOutput": {
        "hookEventName": "Stop",
        "additionalContext": "All tests passed!"
    }
}
EOF
else
    cat <<EOF
{
    "hookSpecificOutput": {
        "hookEventName": "Stop",
        "additionalContext": $TEST_OUTPUT_ESCAPED
    }
}
EOF
fi

exit 0
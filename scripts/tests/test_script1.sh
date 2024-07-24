
### 6. Test Scripts

#### `tests/test_script1.sh`

# Create test scripts to validate your scripts' functionality.

# ```bash
# #!/bin/bash

# Test for script1.sh

source "../lib/helper_functions.sh"

test_log_function() {
    log "Test log message"
    if grep -q "Test log message" "../logs/script1.log"; then
        echo "Test passed!"
    else
        echo "Test failed!"
    fi
}

# Run tests
test_log_function

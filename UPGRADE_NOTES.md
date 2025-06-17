# Dependency Upgrade Notes

## Request to Axios Migration

The project has been updated to replace the deprecated `request` package with `axios` for making HTTP requests.

### Changes Made:

1. Updated `template/package.json`:
   - Removed `request` dependency
   - Added `axios` dependency (version 1.6.2)

2. Updated `template/app/models/base.js`:
   - Changed import from `request` to `axios`
   - Updated the `invoke` method to use axios syntax:
     - Changed `body` parameter to `data` (axios uses `data` for request body)
     - Implemented async/await pattern with try/catch for error handling
     - Removed manual JSON parsing as axios automatically parses JSON responses

3. Updated `template/build/models/base.js`:
   - Similar changes to the source file, but in the transpiled format

### Key Differences Between Request and Axios:

1. **Request Body**: 
   - `request` uses `body` parameter
   - `axios` uses `data` parameter

2. **Response Handling**:
   - `request` requires manual JSON parsing with `JSON.parse(body)`
   - `axios` automatically parses JSON responses, available at `response.data`

3. **Error Handling**:
   - `request` uses callback with error as first parameter
   - `axios` uses Promises/async-await with try/catch blocks

4. **Default Behavior**:
   - `axios` automatically stringifies JavaScript objects sent as data
   - `axios` automatically parses JSON responses

### Testing:

The changes have been implemented to maintain the same functionality while using the more modern axios library. The API interface of the BaseModel class remains the same, so no changes were needed in the models that extend it (HomeModel and IpInfoModel).
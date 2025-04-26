# Update Dummy Api

1. Takes two query params email and password in query
2. Returns access token if successful
3. This access token should be valid for 7 days
4. Should return appropriate response if invalid data is passed

### Test Cases

1. If Email Id and Password is correct -> Should return correct response - Done
2. If Email Id or Password doesn't match -> Should return Invalid Response - Done
3. If Email Id is not received -> Should return Email Id is required - Done
4. If Password is not received -> Should return Password is required - Done

### Internal Work
Sessions should get stored in database either Redis or Postgres
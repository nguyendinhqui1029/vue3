http://127.0.0.1:8000/api/v1/admin/login
{
"email" : "user@gmail.com",
"password" :"123123123"
}

http://127.0.0.1:8000/api/client/users
http://127.0.0.1:8000/api/client/calculate-point
{
"user_id" : 2,
"status" : 3,
"amount_coin" :1
}
http://127.0.0.1:8000/api/v1/client/all-user

http://127.0.0.1:8000/api/client/users/delete/{addressWalletId}/address-wallet

http://127.0.0.1:8000/api/client/users/add-wallet
{
"name" :"ABC",
"wallets_code" : "123XYZ"
}

http://127.0.0.1:8000/api/client/users/3 // delet account

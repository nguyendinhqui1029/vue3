<?php
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\V1\Client\UserController;

Route::delete('users/delete/{addressWalletId}/address-wallet',[UserController::class, 'deleteAddressWallet'])->name('users.delete.address-wallet');

// liên kết với ví
Route::post('users/add-wallet',[UserController::class, 'addWallet'])->name('users.add-wallet');

Route::resource('users', UserController::class)->except(['create','edit','update','store','show']);

<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller{
      public function listUser(){
      //  $user = new User();
      //  $user->name = 'Paulo Machado';
      //  $user->email = 'machadomachado@estudos.com.br';
      //  $user->password = Hash::make('123');
      //  $user->save();

        //echo "<h1>Listagem deUsuário</h1>";
        $user = User::where('id','=',1)->first();

        return view('listUser',[
            'user' => $user
        ]);
      }

}

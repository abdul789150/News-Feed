<?php

namespace App\Services;

use App\Models\User;
use App\Interfaces\UserInterface;

class UserService
{
    private $userInterface;

    public function __construct(UserInterface $userInterface)
    {
        $this->userInterface = $userInterface;
    }

    public function register(array $data): User
    {
        // Validate input data
        $validatedData = validator($data, [
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ])->validate();

        // Hash the password before storing it in the database
        $validatedData['password'] = bcrypt($validatedData['password']);

        // Create a new user
        return $this->userInterface->create($validatedData);
    }

    public function authenticate(string $email, string $password): ?User
    {
        // Find the user by email
        $user = $this->userInterface->findByEmail($email);

        // Check if the user exists and the password is correct
        if ($user && password_verify($password, $user->password)) {
            return $user;
        }

        return null;
    }    
}

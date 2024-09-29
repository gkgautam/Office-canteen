"use server";

import connectDB from "@/db/connection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

interface SignInResponse {
	success: boolean;
	statusCode: number;
	message: string;
	user?: {
		firstName: string;
		lastName: string;
		email: string;
		gender: string;
		phone: string;
		profileImage: string | null | undefined;
	};
	token?: string;
	error?: string;
}

export async function signInUser(formData: FormData): Promise<SignInResponse> {
	try {
		await connectDB(); // Ensure DB connection is established

		const email = formData.get("email") as string | null;
		const password = formData.get("password") as string | null;

		if (!email || !password) {
			return {
				success: false,
				statusCode: 400,
				message: "Please provide both email and password"
			};
		}

		// Check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			return {
				success: false,
				statusCode: 401,
				message: "Invalid email or password"
			};
		}

		// Compare provided password with hashed password in the database
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return {
				success: false,
				statusCode: 401,
				message: "Invalid email or password"
			};
		}

		// If password matches, return success response

		else {
			const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET_KEY!, {
				expiresIn: "1h"
			});

			return {
				success: true,
				statusCode: 200,
				message: "User signed in successfully",
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					gender: user.gender,
					phone: user.phone,
					profileImage: user.profileImage
				},
				token
			};
		}


	} catch (error: any) {
		console.error("Error signing in User:", error);
		return {
			success: false,
			statusCode: 500,
			message: "Internal Server Error",
			error: error.message
		};
	}
}

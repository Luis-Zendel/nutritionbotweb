import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod'

// Crear función para validar en la base de datos 

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
        async authorize(credentials){
            const paisedCredentials = z 
            .object({email: z.string().email(), password: z.string().min()})
            .safeParse(credentials)
        }
  })],
});
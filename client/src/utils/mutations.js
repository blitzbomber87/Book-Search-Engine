import { gql } from '@apollo/client';

export const UserLogin = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }

`;

export const AddUser = gql`
    mutation addUser($username: String!, $password: String!, $email: String!) {
        addUser(username: $username, password: $password, email: $email) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const SaveBook = gql`
mutation saveBook($input:  )

`
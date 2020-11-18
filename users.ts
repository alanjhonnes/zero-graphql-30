export interface User {
    id: number;
    name: string;
    email: string;
    friendIds: number[];
}

export const users: User[] = [
    {
        id: 1,
        name: 'Alan Jhonnes',
        email: 'alan.sa@mjv.com.br',
        friendIds: [2,3,4],
    },
    {
        id: 2,
        name: 'Monique',
        email: 'monique@mjv.com.br',
        friendIds: [1,3],
    },
    {
        id: 3,
        name: 'Formoso',
        email: 'formoso@mjv.com.br',
        friendIds: [1,4],
    },
    {
        id: 4,
        name: 'Fernando',
        email: 'fernando@mjv.com.br',
        friendIds: [1],
    }
];

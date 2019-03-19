import {UserJoinedWithProduct} from './userjoinedwithproduct';

export class UserJoinedWithProductResponse{
    success: boolean;
    message: string;
    joinedCollections: UserJoinedWithProduct[];
}
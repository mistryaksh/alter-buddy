export interface IBlogProps {
     label: string;
     subLabel: string;
     body: string;
     comment?: IBlogCommentProps[];
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface IBlogCommentProps {
     userId: string;
     body: string;
}

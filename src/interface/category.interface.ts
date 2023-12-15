export interface ICategoryProps {
     title: string;

     status: boolean;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface ISubCategoryProps {
     label: string;
     categoryId: ICategoryProps;
     subTitle: string;
     desc: string;
     symptoms: string[];
     causes: string[];
     treatment: string[];
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

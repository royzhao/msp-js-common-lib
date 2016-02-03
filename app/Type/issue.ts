export interface Issue{
    author:number; //author`s user id
    code_id:number;
    content:string;
    create_date:Date;
    id:number;
    status:number;
    title:string;
}
export interface Comment extends Issue{
    issue_id:number;
    reply_to:number;
}
export interface CodeAll{
    meta:CodeStep;
    cmds:CodeStepCmd;
    code:CodeDetail;
}

export interface Code{
    id:number;
    create_date:Date;
    description:string;
    name:string;
    star:number;
    user_id:string;
}

export interface CodeDetail{
    id           :number;    
	stepid       :number;
	code_content :string;
	post_content :string;
	time         :Date;
}

export interface CodeStepCmd{
    id  :number;
    seq :number;
    cmd :string;
    args:string;
    is_replace:number;
    stepid:number;
}


export interface CodeStep{
    code_id:number;
    code_name:string;//run code file name
    create_date:Date;
    description:string;
    id:number;
    image_id:number;
    name:string;
    status:number;//1 is writing,2 is done
    word_idr:string;
}
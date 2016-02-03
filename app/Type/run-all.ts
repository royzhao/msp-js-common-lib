import {CodeStepCmd,CodeStep} from './code-all';

export interface RunInfo{
    code: string;
    meta: CodeStep;
    cmds: CodeStepCmd;
}

export interface RunRes{
    res: string;
    status:number;
    run_id:string;
}
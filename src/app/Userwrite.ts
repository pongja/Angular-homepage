
export class Userwrite {
  constructor(
    public id:string, //글쓰기 id
    public uuid:string, //글삭제시 사용할 uuid
    public number: string, //게시글조회시 사용할 number
    public title: string, //게시글 제목
    public content:string, //게시글 내용
    public date:string, //게시글 조회시 사용할 날짜
    public account:string, //게시글 조회수로 사용할 account 
){}
}

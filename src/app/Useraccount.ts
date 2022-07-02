
export class Useraccount{
  constructor(
    public id:string, //로그인시 서버에서 사용될 id 
    public uuid:string, //로그인시 서버에서 한번더 사용될 암호화된 uuid 
    public username: string, //로그인시 usernmae
    public name: string, //로그인했을시 가져올 name
    public password: string, //로그인했을시 가져올 password
    public email: string //로그인했을시 email 
){}
}

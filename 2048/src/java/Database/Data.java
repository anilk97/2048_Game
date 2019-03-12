
package Database;


public class Data {
    String name;
    String password;
    String email;
    int score=0;
    public void setName(String n){
        name=n;
    }
    public void setPassword(String p){
        password=p;
    }
    public void setEmail(String e){
        email=e;
    }
    public void setScore(int s){
        score=s;
    }
    public String getName(){return name;}
    public String getPassword(){return password;}
    public String getEmail(){return email;}
    public int getScore(){return score;}
}

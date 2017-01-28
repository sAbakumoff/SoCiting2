namespace SoCiting.Data
{
    public class Reference
    {
        public int Id{get;set;}
        public System.Int64 QuestionId{get;set;}
        public string Repo{get;set;}
        public string Branch{get;set;}
        public string Path{get;set;}
        public int LineNumber{get;set;}
    }
}
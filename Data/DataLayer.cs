using System.Collections.Generic;
using Microsoft.Data.Sqlite;
using System;
using Microsoft.Extensions.Logging;

namespace SoCiting.Data
{
    internal sealed class DataLayer
    {
        private string DbPath{get; set;}
        public DataLayer(string dbPath){
            DbPath = dbPath;
        }

        public  List<Language> GetLanguages(){
            var query = "select id, DisplayName, TableName from languages";
            return GetEntities(query, reader=>{
                return new Language{Id=reader.GetInt32(0), DisplayName = reader.GetString(1), TableName = reader.GetString(2)};
            });
        }

        public  List<Reference> GetReferences(string lang, System.Int64 questionId)
        {
            var query = string.Format("select id, repo, branch, path, line_number from {0} where question_id={1}", lang, questionId);
            return GetEntities(query, reader=>{
                return new Reference{
                        Id = reader.GetInt32(0),
                        Repo = reader.GetString(1),
                        Branch = reader.GetString(2),
                        Path = reader.GetString(3),
                        LineNumber = reader.GetInt32(4)
                    };
            });
        }
        
        public  List<Question> GetQuestions(string lang, int offset=0, int? limit=10)
        {
            var slice = limit.HasValue ? string.Format("limit {0}, {1}", offset, limit) : string.Empty;
            var query = string.Format(
                        "select questions.id, title, count(*) as count from questions join {0} on questions.id = {0}.question_id group by questions.id order by count desc {1}", lang, slice);
            System.Console.WriteLine(string.Format("Query is {0}", query));
            return GetEntities(query, reader=>{
                return new Question{
                        Id = reader.GetInt32(0),
                        Title = reader.GetString(1),
                        Count = reader.GetInt32(2)
                    };
            });
        }

        private List<T> GetEntities<T>(string query, Func<SqliteDataReader, T> builder)
        {
            SqliteConnection connection = null;
            SqliteCommand command = null;
            SqliteDataReader reader = null;
            var list = new List<T>();
            try
            {
                connection = new SqliteConnection(DefaultConnectionString);
                connection.Open();
                command = new SqliteCommand(query, connection);
                reader = command.ExecuteReader();
                while(reader.Read()){
                    list.Add(builder(reader));
                }

            }
            finally
            {
                if(reader != null)
                    reader.Dispose();
                if (command != null)
                    command.Dispose();
                if (connection != null)
                    connection.Dispose();

            }
            return list;
            
        }

        private  string DefaultConnectionString
        {
            get
            {
                if (_defConnectionString != null)
                    return _defConnectionString;
                var connStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder
                {
                    DataSource =  DbPath
                };
                _defConnectionString = connStringBuilder.ConnectionString;
                return _defConnectionString;
            }
        }private static string _defConnectionString;

    }


}
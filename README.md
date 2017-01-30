# Motivation
I am a big fan of Google Cloud Platform, especially I love its data warehouse implementation called BigQuery. In summer of 2016 Github and Google made the open-source data available for everyone in BigQuery, here are the mind boggling numbers:
> This 3TB+ dataset comprises the largest released source of GitHub activity to date. It contains a full snapshot of the content of more than 2.8 million open source GitHub repositories including more than 145 million unique commits, over 2 billion different file paths, and the contents of the latest revision for 163 million files, all of which are searchable with regular expressions.

I have since then never tired of exploring these data, revealing interesting patterns or extreme samples and publishing the [medium articles](https://medium.com/@sAbakumoff) about my findings.
In December of 2016 Google team has woke up my "researcher within" again - they've added Stack Overflow's history of questions and answers to the collection of public datasets on BigQuery. In practice that means that the most popular programming chat in the world is now can be analyzed with the power of Google Cloud Platform, for example one can run the [sentiment analysis](https://medium.freecodecamp.com/always-end-your-questions-with-a-stack-overflow-bigquery-and-other-stories-2470ebcda7f#.bhdeolgrt) on the Stack Overflow data and find out that Python developers post the lowest percent of negative comments overall! What excites me the most though is the ability to join the Stack Overflow data with other [publicly available data sets](https://cloud.google.com/bigquery/public-data/). For example one can try to find out whether the weather can affect the probability of a Stack Overflow question to be answered by using the data from [NOAA dataset](https://cloud.google.com/bigquery/public-data/noaa-gsod)(I am actually going to conduct this research soon).
In the [introduction to the Stack Overflow data availability](https://cloud.google.com/blog/big-data/2016/12/google-bigquery-public-datasets-now-include-stack-overflow-q-a) Felipe Hoffa provided the sample of joining Github and Stack Overflow data to find out which are the most referenced Stack Overflow questions in the GitHub code—specifically, Javascript. It gripped my attention because I noticed a couple of limitations: 
* The query searches only for stackoverflow.com/questions/([0-9]+)/ pattern in the source code. However, there are alternative forms of referencing questions : it could a short form stackoverflow.com/q/([0-9]+)/ and it could be the direct reference to one of the answers, like stackoverflow.com/answers/([0-9]+)/
* The query deals only with JavaScript sources, but there are plenty of other programming languages.

So, I set out to build the catalog of the stack overflow questions referenced in the GitHub sources for popular programming languages.

# Getting the data
**Step 1** Finding lines of code in Github Sources that have references to StackOverflow questions or answers. [contents_top_repos_top_langs](https://bigquery.cloud.google.com/dataset/fh-bigquery:github_extracts) table that keeps contents for the top languages from the top repos was kindly provided by Felipe Hoffa
```
SELECT
  files.id AS id,
  FIRST(files.repo_name) AS repo,
  REGEXP_EXTRACT(FIRST(files.ref), r"refs/heads/(.*)$") AS branch,
  FIRST(files.path) AS path,
  REGEXP_EXTRACT(FIRST(files.path), r'\.([^\.]*)$') AS ext,
  FIRST(lines.line) AS line,
  REGEXP_EXTRACT(FIRST(lines.line), r'stackoverflow.com/(?:q|questions)/([0-9]+)') question_id,
  REGEXP_EXTRACT(FIRST(lines.line), r'stackoverflow.com/(?:a|answers)/([0-9]+)') answer_id,
  STRING(FIRST(lines.pos)) AS line_number
FROM
  [bigquery-public-data:github_repos.files] files
JOIN (
  SELECT
    line,
    id,
    POSITION(line) AS pos
  FROM (
    SELECT
      id,
      SPLIT(REPLACE(content, "\n", " \n"), "\n") AS line
    FROM
      [fh-bigquery:github_extracts.contents_top_repos_top_langs] )) lines
ON
  lines.id = files.id
WHERE
  lines.line LIKE '%stackoverflow.com%'
GROUP BY
  id
```
The result has been saved in the new table called "so_ref_top_repos_top_langs" which contains the rows like
```
 {
    "id": "0178eab0055540387fe3bd6bb470052dadfdfcf9",
    "repo": "firulais/jsdelivr",
    "branch": "master",
    "path": "files/leaflet.esri/1.0.0-rc.8/builds/feature-layer/esri-leaflet-feature-layer-src.js",
    "ext": "js",
    "line": "  // or hole. this logic was found at http://stackoverflow.com/questions/1165647",
    "question_id": "1165647",
    "answer_id": null,
    "line_number": "77"
  }
```
**Step 2** Join the result with the StackOverflow data. The query should handle both of the questions id's and answers id's extracted from the source code
```
 SELECT
    q.id id,
    q.title title,
    q.creation_date creation_date,
    t.repo repo,
    t.branch branch,
    t.path path,
    t.ext ext,
    t.line_number line_number
  FROM
    [bigquery-public-data:stackoverflow.posts_questions] q
  JOIN (
    SELECT *
    FROM (
      SELECT
        a.parent_id AS question_id,
        b.repo AS repo,
        b.branch as branch,
        b.path as path,
        b.ext as ext,
        b.line_number as line_number
      FROM
        [bigquery-public-data:stackoverflow.posts_answers] a
      JOIN
        (select Integer(answer_id) answer_id, repo, branch, path, ext, line_number 
        from [Dataset1.so_ref_top_repos_top_langs] where answer_id is not null) b
      ON
        a.id = b.answer_id),
      (
      SELECT
        a.id AS question_id,
        b.repo AS repo,
        b.branch as branch,
        b.path as path,
        b.ext as ext,
        b.line_number as line_number       
      FROM
        [bigquery-public-data:stackoverflow.posts_questions] a
      JOIN
        (select Integer(question_id) question_id, repo, branch, path, ext, line_number 
        from [Dataset1.so_ref_top_repos_top_langs] where question_id is not null) b
      ON
        a.id = b.question_id) ) t
  ON
    t.question_id = q.id
``` 
The result contains the rows the look like
```
  {
    "id": "35119531",
    "title": "Catch Objective-C exception in Swift",
    "creation_date": "2016-01-31 21:13:12 UTC",
    "repo": "exposit-ds/lf.swift",
    "branch": "master",
    "path": "Platforms/iOS/lf.h",
    "ext": "h",
    "line_number": "6"
  }
```
There were roughly 31K records like that, the next question was on how to visualize them.
# Building the web-site

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

# Building the web-site

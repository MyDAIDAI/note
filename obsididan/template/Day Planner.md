
## {{date: YYYY-MM-DD dddd 第ww周 }}

### 本月重点

### 工作未完成内容
```dataviewjs
dv.taskList(dv.pages('"work"').file.tasks
    .where(t => !t.completed))
```


### 今日工作


```tasks
not done
due on {{date:YYYY-MM-DD}}
path includes work
```






### 生活计划


### 今日待做
```tasks 
not done
due on today
```

### 日常记录




### 每日复盘





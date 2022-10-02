
## {{date: YYYY-MM-DD dddd 第ww周 }}

### 本月重点

### 工作未完成内容
```tasks
not done
path includes work
```


### 今日工作


```tasks
due on {{date:YYYY-MM-DD}}
path includes work
```

```dataviewjs
dv.taskList(
    dv.pages('"work"').file.tasks
    .where(t => t.text.includes("#todo") && !t.completed),1)
```




### 生活计划
```tasks
due on {{date:YYYY-MM-DD}}
path includes life
```




### 日常记录




### 每日复盘





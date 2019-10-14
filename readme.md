## A. Requirements
- **GET SEMUA WEBTOON**

```javascript
exports.index = (req, res) => {
    comics.findAll().then(comics => res.send(comics))   
}   
```

<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/12.edit_my_webtoon_episode_screen/imageGit/1.jpg?raw=true" width="800" alt="get semua webtoon"/>

- **GET SEMUA WEBTOON FAVORITE**
<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/12.edit_my_webtoon_episode_screen/imageGit/1.jpg?raw=true" width="800" alt="get semua webtoon favorite"/>

- **SEARCH SEMUA WEBTOON BERDASARKAN TITLE**
<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/12.edit_my_webtoon_episode_screen/imageGit/1.jpg?raw=true" width="800" alt="get semua webtoon berdasarkan title"/>
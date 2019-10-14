## A. Requirements
- **GET SEMUA WEBTOON**

```javascript
exports.index = (req, res) => {
    comics.findAll().then(comics => res.send(comics))   
}   
```

<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/15.for_you_implementation/imageGit/getAll.PNG?raw=true" width="800" alt="get semua webtoon"/>

- **GET SEMUA WEBTOON FAVORITE**
```javascript
exports.favorite = (req, res) => {
    comics.findAll({
        where : {
            isFavorite : true
        }
    }).then(comics => res.send(comics))
}   
```

<img src="https://raw.githubusercontent.com/DumbWaysStudent/DW12EC5FV_webtoon/15.for_you_implementation/imageGit/favorite.PNG" width="800" alt="get semua webtoon favorite"/>

- **SEARCH SEMUA WEBTOON BERDASARKAN TITLE**

```javascript
exports.search = (req, res) => {
    const title = req.params.title
    comics.findAll({
        where : {
            title : `${title}`
        }
    }).then(comics => res.send(comics))
}
```

<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/15.for_you_implementation/imageGit/search.PNG?raw=true" width="800" alt="get semua webtoon berdasarkan title"/>
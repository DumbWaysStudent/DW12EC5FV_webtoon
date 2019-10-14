## A. Requirements
- **GET SEMUA EPISODE WEBTOON TERTENTU**

## Menambahkan route di index
```javascript
router.get('/wehtoons/:id/episodes', TodosController.episodes)
```


## Menambahkan associate hasMany pada models comics.js

```javascript
comics.hasMany(models.comics_details, {
      as : 'episodes',
      foreignKey : 'comic'
    })   
```
## Menambahakan varabel episodes di controller

```javascript
exports.episodes = (req, res) => {
    comics.findAll({
        include : [{
            model : comicDetail,
            as : "episodes"
        }], 
        where : {
            id : req.params.id
        }
    }).then(comics =>{res.send(comics[0]["episodes"])}).catch(errror => {
        console.log(errror)
    })
}
```

## Pengetestan
1. Untuk isi database terdiri dari 4 comic
<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/16.detail_webtoon_implementation/imageGit/select_comics.PNG?raw=true" width="800" alt="get semua webtoon"/>

2. Memasukan parameter sesuai Requirements dan melihat hasilnya
<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/16.detail_webtoon_implementation/imageGit/comic_1.PNG?raw=true" width="800" alt="get comic 1"/>

<img src="https://github.com/DumbWaysStudent/DW12EC5FV_webtoon/blob/16.detail_webtoon_implementation/imageGit/comic_2.PNG?raw=true" width="800" alt="get comic 2"/>
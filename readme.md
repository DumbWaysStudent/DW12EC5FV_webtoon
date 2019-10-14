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

2. Memasukan parameter sesuai Requirements dan melihat hasilnya
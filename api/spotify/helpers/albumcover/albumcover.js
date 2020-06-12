// const express = require('express');
// const router = express.Router();
const fs = require('fs');
const Vibrant = require('node-vibrant')

import redis from 'async-redis'
import axios from 'axios'

const Path = require('path')

const path = Path.resolve(__dirname, 'tempfiles', 'image.jpg')


// Thanks to this reference I got to learn about filestreams
// https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js

async function download (url) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(path))

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve(path)
        })

        response.data.on('error', err =>{
            reject(err)
        })
    })
}

async function getProminentColor (url) {
    console.log('image is ')

 const palette = await Vibrant.from(url, {
        colorCount: 2
      }).getPalette()
       

        //   Delete image
        // fs.unlink(url, (err) => {
        //     if (err) {
        //         console.error(err)
        //         return
        //     }
        // })

        const test =  Object.entries(palette).map(( [k, v] ) => ({ [k]: v }));

        const dominantColor = test.map(color => {
        console.log(color[Object.keys(color)[0]])
        return {
            ... color[Object.keys(color)[0]]
        }
        }).reduce((prev, next) => prev['_population'] > next['_population'] ? prev : next )
        
        console.log('dom color', dominantColor)
          
        return dominantColor._rgb.join(',')
}





module.exports = {
    download: download,
    getProminentColor: getProminentColor
}
import React, { useEffect } from 'react';
import { fabric } from 'fabric';

function UploadImg() {
    let canvas, ctx;

    // using useEffect to get canvas element after first render
    useEffect(() => {
        // make new fabric element
        canvas = new fabric.Canvas('canvas', {
            allowTouchScrolling: false,
        });
        ctx = canvas.getContext('2d');
        // zoom in/out using mouse scrolling
        canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;
            // limit the level of zoom
            if (zoom > 10) {
                zoom = 1;
                canvas.viewportCenterObject(canvas.item(0));
                // canvas.centerObject()
            }
            if (zoom < 0.1) {
                zoom = 1;
            }
            canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        });
    }, []);


    // function to upload a image to the canvas
    const uploadImg = (e) => {
        // check if file exists
        if (!e.target.files || !e.target.files[0]) {
            return;
        }
        // console.log(canvas._objects);
        canvas.clear();
        // reading the image file
        const FR = new FileReader();
        FR.addEventListener("load", (evt) => {
            const img = new Image();
            img.src = evt.target.result;
            // set the image in the fabric canvas
            fabric.Image.fromURL(img.src, function (oImg) {
                // scale the image
                oImg.scaleToHeight(200);
                oImg.scaleToWidth(300);
                canvas.add(oImg);
            });
        });
        FR.readAsDataURL(e.target.files[0]);
    }
    return (
        <div>
            <div style={{ overflow: 'hidden' }}>
                <canvas id="canvas" width="300" height="200" style={{ display: '', zIndex: '0' }}></canvas>
            </div>
            <input onChange={(e) => { uploadImg(e) }} style={{ marginTop: '10px', backgroundColor: 'pink' }} type="file" name="file" id="file" />
        </div>
    )
}

export default UploadImg
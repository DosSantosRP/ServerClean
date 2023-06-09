setTimeout(function(){ 
    var canvas = {
        canvas : null,
        stage : null,
        crosshair : {
            group : null,
            classic : {
                group : null,
                left : null,
                right : null,
                top : null,
                bottom : null,
                dot : null
            },
            def : {
                group : null,
                left : null,
                right : null,
                top : null,
                bottom : null,
                dot : null,
                lines : {
                    left : null,
                    right : null,
                    top : null,
                    bottom : null
                }
            }
        }
    };

    var center = {
        x : 0,
        y : 0
    };

    var crosshair = {
        alpha : 200,
        color : 5,
        color_b : 50,
        color_r : 50,
        color_g : 250,
        dot : 0,
        gap : 0,
        size : 5,
        style : 2,
        usealpha : 1,
        thickness : 0.5,
        fgap : 0
    };

    $(function() {
        canvas.canvas = $("#crosshair_canvas");
        canvas.canvas.empty();

        canvas.stage = new Kinetic.Stage({
            container : canvas.canvas.attr("id"),
            width : canvas.canvas.width(),
            height : canvas.canvas.height()
        });

        var layer = new Kinetic.Layer();
        canvas.stage.add(layer);

        center = {
            x : canvas.stage.getWidth() / 2,
            y : canvas.stage.getHeight() / 2
        };

        canvas.crosshair = createCrosshair(layer, crosshair, center);

        layer.draw();
    });

    function createCrosshair(layer, crosshair, center) {           
        var canvasCrosshair = {
            group : null,
            classic : {
                group : null,
                left : null,
                right : null,
                top : null,
                bottom : null,
                dot : null
            },
            def : {
                group : null,
                left : null,
                right : null,
                top : null,
                bottom : null,
                dot : null,
                lines : {
                    left : null,
                    right : null,
                    top : null,
                    bottom : null
                }
            }
        };

        canvasCrosshair.group = new Kinetic.Group({
            position : {
                x : center.x,
                y : center.y
            }
        });
        layer.add(canvasCrosshair.group);
        canvasCrosshair.group.moveToTop();

        // Crosshair classic
        canvasCrosshair.classic.group = new Kinetic.Group();
        canvasCrosshair.group.add(canvasCrosshair.classic.group);
        if (getCrosshairStyleType(crosshair.style) == "classic")
            canvasCrosshair.classic.group.show();
        else
            canvasCrosshair.classic.group.hide();

        var crosshairShape = new Kinetic.Rect({});
        canvasCrosshair.classic.left = crosshairShape.clone();
        canvasCrosshair.classic.right = crosshairShape.clone();
        canvasCrosshair.classic.top = crosshairShape.clone();
        canvasCrosshair.classic.bottom = crosshairShape.clone();

        canvasCrosshair.classic.dot = new Kinetic.Rect({});

        canvasCrosshair.classic.group.add(canvasCrosshair.classic.left);
        canvasCrosshair.classic.group.add(canvasCrosshair.classic.right);
        canvasCrosshair.classic.group.add(canvasCrosshair.classic.top);
        canvasCrosshair.classic.group.add(canvasCrosshair.classic.bottom);
        canvasCrosshair.classic.group.add(canvasCrosshair.classic.dot);

        // Crosshair default
        canvasCrosshair.def.group = new Kinetic.Group();
        canvasCrosshair.group.add(canvasCrosshair.def.group);
        if (getCrosshairStyleType(crosshair.style) == "default")
            canvasCrosshair.def.group.show();
        else
            canvasCrosshair.def.group.hide();

        var crosshairShapeDef = new Kinetic.Rect({

        });
        canvasCrosshair.def.left = new Kinetic.Polygon({
            points : [ 0, 0, -15, -2, -15, 2 ],
            offset : [ 10, 0 ],
            fill : "black"
        });
        canvasCrosshair.def.right = canvasCrosshair.def.left.clone();
        canvasCrosshair.def.top = canvasCrosshair.def.left.clone();
        canvasCrosshair.def.bottom = canvasCrosshair.def.left.clone();

        canvasCrosshair.def.dot = new Kinetic.Circle({
            x : 0,
            y : 0,
            radius : 2,
            shadow : {
                color : 'black',
                blur : 3,
                offset : [ 0, 0 ],
                opacity : 1
            }
        });

        canvasCrosshair.def.lines.left = crosshairShapeDef.clone();
        canvasCrosshair.def.lines.right = crosshairShapeDef.clone();
        canvasCrosshair.def.lines.top = crosshairShapeDef.clone();
        canvasCrosshair.def.lines.bottom = crosshairShapeDef.clone();

        canvasCrosshair.def.group.add(canvasCrosshair.def.left);
        canvasCrosshair.def.group.add(canvasCrosshair.def.right);
        canvasCrosshair.def.group.add(canvasCrosshair.def.top);
        canvasCrosshair.def.group.add(canvasCrosshair.def.bottom);
        canvasCrosshair.def.group.add(canvasCrosshair.def.dot);
        canvasCrosshair.def.group.add(canvasCrosshair.def.lines.left);
        canvasCrosshair.def.group.add(canvasCrosshair.def.lines.right);
        canvasCrosshair.def.group.add(canvasCrosshair.def.lines.top);
        canvasCrosshair.def.group.add(canvasCrosshair.def.lines.bottom);

        /////////
        
        var color = "red", gap = 10, thickness = 2, length = 20;		
        canvasCrosshair.classic.top.setSize(thickness, length * -1);
        canvasCrosshair.classic.top.setFill(color);
        canvasCrosshair.classic.top.setOffset(thickness / 2, (thickness / 2) + gap);

        canvasCrosshair.classic.left.setAttrs(canvasCrosshair.classic.top.getAttrs());
        canvasCrosshair.classic.left.rotateDeg(-90);

        canvasCrosshair.classic.right.setAttrs(canvasCrosshair.classic.top.getAttrs());
        canvasCrosshair.classic.right.rotateDeg(90);

        canvasCrosshair.classic.bottom.setAttrs(canvasCrosshair.classic.top.getAttrs());
        canvasCrosshair.classic.bottom.rotateDeg(180);

        /////////

        return canvasCrosshair;
    };

    function getCrosshairStyleType(style) {
        return style == 0 || style == 1 ? "default" : "classic";
    };
 }, 3000);
/** CSci-4611 Example Code
 * Copyright 2023+ Regents of the University of Minnesota
 * Please do not distribute beyond the CSci-4611 course
 */

import * as gfx from 'gophergfx'


export class ExampleApp extends gfx.GfxApp
{   
    private day = false;
    private ambientLight: gfx.AmbientLight = new gfx.AmbientLight();
    private pointLight: gfx.PointLight = new gfx.PointLight;
    private directionalLight: gfx.DirectionalLight = new gfx.DirectionalLight();
    private lamp: gfx.Mesh3 = new gfx.Mesh3();
    private lampDayMaterial: gfx.PhongMaterial = new gfx.PhongMaterial();
    private lampNightMaterial: gfx.UnlitMaterial = new gfx.UnlitMaterial();


    // --- Create the ExampleApp class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();
    }

    onKeyDown(event: KeyboardEvent): void {
        this.toggleDayNight();
    }

    toggleDayNight(): void {
        this.day = !this.day;
        if (this.day) {
            this.renderer.background = new gfx.Color(205/255, 237/255, 242/255);

            this.ambientLight.diffuseIntensity = new gfx.Vector3(50/255, 50/255, 50/255);
        
            this.pointLight.visible = false;

            this.directionalLight.visible = true;
            this.directionalLight.position = new gfx.Vector3(-1, -1, 1);
            this.directionalLight.diffuseIntensity = new gfx.Vector3(255/255, 255/255, 240/255);
            this.directionalLight.specularIntensity = new gfx.Vector3(100/255, 100/255, 100/255);

            this.lamp.material = this.lampDayMaterial;
        
        } else {
            this.renderer.background = new gfx.Color(40/255, 45/255, 46/255)

        }
    }

    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        this.renderer.viewport = gfx.Viewport.CROP;
        this.camera.setPerspectiveCamera(60, 1000/1000, 1, 10000);
        this.camera.position = new gfx.Vector3(500, 500, 500 / Math.tan(Math.PI * 30 / 180));
        this.camera.lookAt(new gfx.Vector3(500, 500, 0), new gfx.Vector3(0, -1, 0));

        // Create an ambient light
        this.ambientLight = new gfx.AmbientLight(new gfx.Vector3(0.2, 0.2, 0.2));
        this.scene.add(this.ambientLight);

        this.pointLight.position.set(.75, 1.1, 1);
        this.scene.add(this.pointLight);

        this.directionalLight.position.set(.75, 1.1, 1)
        this.directionalLight.visible = false;
        this.scene.add(this.directionalLight);

        const ground = new gfx.Node3();
        ground.position = new gfx.Vector3(500, 1000, 0);
        this.scene.add(ground);


        // grass
        const grassMaterial = new gfx.PhongMaterial();
        grassMaterial.diffuseColor = new gfx.Color(14/255, 59/255, 18/255);
        grassMaterial.specularColor = new gfx.Color(0/255, 0/255, 0/255);
        grassMaterial.shininess = 1.0;

        const grass = gfx.Geometry3Factory.createBox(10000, 10, 10000);
        grass.material = grassMaterial;
        ground.add(grass);


        // path
        const pathMaterial = new gfx.PhongMaterial();
        pathMaterial.diffuseColor = new gfx.Color(150/255, 150/255, 170/255);
        pathMaterial.specularColor = new gfx.Color(0/255, 0/255, 0/255);
        pathMaterial.shininess = 1.0;

        const path = gfx.Geometry3Factory.createBox(900,12,10000);
        path.material = pathMaterial;//.setColor(new gfx.Color(150/255, 150/255, 170/255));
        ground.add(path);


        // snowman
        const snowmanMaterial = new gfx.PhongMaterial();
        snowmanMaterial.diffuseColor = new gfx.Color(200/255, 200/255, 200/255);
        snowmanMaterial.specularColor = new gfx.Color(255/255, 255/255, 255/255);
        snowmanMaterial.shininess = 20.0;

        const snowman = gfx.Geometry3Factory.createSphere(300, 3);
        snowman.position = new gfx.Vector3(500, 800, -600);
        snowman.material = snowmanMaterial;
        this.scene.add(snowman);

        const snowmanMiddle = gfx.Geometry3Factory.createSphere(250, 3);
        snowmanMiddle.position = new gfx.Vector3(0, -350, 0);
        snowmanMiddle.material = snowmanMaterial;
        snowman.add(snowmanMiddle);

        const snowmanTop = gfx.Geometry3Factory.createSphere(180, 3);
        snowmanTop.position = new gfx.Vector3(0, -330, 0);
        snowmanTop.material = snowmanMaterial;
        snowmanMiddle.add(snowmanTop);


        // lamp post
        const lampPostMaterial = new gfx.PhongMaterial();
        lampPostMaterial.diffuseColor = new gfx.Color(119/255, 119/255, 119/255);
        lampPostMaterial.specularColor = new gfx.Color(255/255, 255/255, 255/255);
        lampPostMaterial.shininess = 200.0;

        const lampPost = gfx.Geometry3Factory.createBox(40, 1000, 40);
        lampPost.position = new gfx.Vector3(1000, 500, -400);
        lampPost.material = lampPostMaterial;
        this.scene.add(lampPost);

        const lampArm = gfx.Geometry3Factory.createBox(240, 40, 40);
        lampArm.position = new gfx.Vector3(-100, -500, 0);
        lampArm.material = lampPostMaterial;
        lampPost.add(lampArm);


        // lamp ball
        this.lampDayMaterial.ambientColor = new gfx.Color(255/255, 255/255, 200/255);
        this.lampDayMaterial.diffuseColor = new gfx.Color(255/255, 255/255, 200/255);
        this.lampDayMaterial.specularColor = new gfx.Color(255/255, 255/255, 255/255);
        this.lampDayMaterial.shininess = 200.0;

        this.lampNightMaterial.color = new gfx.Color(255/255, 255/255, 200/255);

        this.lamp = gfx.Geometry3Factory.createSphere(40);
        this.lamp.position = new gfx.Vector3(800, 60, -400);
        this.lamp.material = this.lampNightMaterial;
        this.scene.add(this.lamp);   
        
        this.toggleDayNight();
    }


    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
    }
}

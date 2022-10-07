import * as THREE from './threejs/build/three.module.js';
// import {OBJLoader} from './three.js-master/examples/jsm/loaders/OBJLoader.js';
import {PLYLoader} from './threejs/examples/jsm/loaders/PLYLoader.js';
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';
import {PCDLoader} from './threejs/examples/jsm/loaders/PCDLoader.js';
const scene = new THREE.Scene();
var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );
// const camera = new THREE.OrthographicCamera( window.innerWidth.width / - 2, window.innerWidth.width / 2, window.innerHeight.height / 2, window.innerHeight.height / - 2, 0.001, 1000 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.PointLight( 0xffffff, 1, 2000);
light.position.set( 50, 50, 50 );
scene.add( light );
const softLight = new THREE.AmbientLight( 0x404040, 2); // soft white light
scene.add( softLight );
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 ); // the default
// document.body.appendChild( renderer.domElement );
document.getElementById("threejs").appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
const controls2 = new OrbitControls( light, renderer.domElement );
controls.enableZoom = false;
controls2.enableZoom = false;
const loaderpcd = new PCDLoader();
// controls.autoRotate = true;
// controls2.autoRotate = true;


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material = new THREE.MeshLambertMaterial( { color: 0x808080 } );
let mesh = new THREE.Mesh( geometry, material );
// scene.add( cube );
const loader = new PLYLoader();
// let face = cube;
const material2 = new THREE.PointsMaterial( {
    color: 0xFFFFFF,
    size: 0.02,
    // blending: THREE.AdditiveBlending,

} );
function load(path){
    loader.load(path, obj => {
        obj.computeVertexNormals();
        mesh = new THREE.Mesh(obj, material)
        mesh.scale.x = 17;
        mesh.scale.y = 17;
        mesh.scale.z = 17;
        scene.add(mesh);
    });
    // controls.autoRotateSpeed = 1;
    // controls2.autoRotateSpeed = 1;
}
function loadpcd(path){
    loaderpcd.load(path, obj => {
        // obj.computeVertexNormals();
        // console.log(obj.Points,material2);
        obj.scale.x = 20;
        obj.scale.y = 20;
        obj.scale.z = 20;
        mesh = new THREE.Points( obj.geometry, material2 );
        // mesh = new THREE.Mesh(obj, material)
        console.log(obj)
        // mesh = obj;
        mesh.scale.x = 20;
        mesh.scale.y = 20;
        mesh.scale.z = 20;
        scene.add(mesh);
    });
    // controls.autoRotateSpeed = 1;
    // controls2.autoRotateSpeed = 1;
}

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    // controls.update()
    // controls2.update()
    renderer.render( scene, camera );
};
document.getElementsByTagName("canvas")[0].style.width = "100%"
document.getElementsByTagName("canvas")[0].style.height = "100%"

document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", (e) =>{
    console.log(e)
    if(e.key == 'Shift'){
        controls.enableZoom = false;
        controls2.enableZoom = false;
        controls.update()
        controls2.update()
    }
}, false);
let counter = 0;
const paths = [
    'images/models/tmpF0.ply',
    'images/models/tmp0.pcd',
    'images/models/tmpF1.ply',
    'images/models/tmp1.pcd',
    'images/models/tmpF2.ply',
    'images/models/tmp2.pcd',
    'images/models/tmpF3.ply',
    'images/models/tmp3.pcd',
    'images/models/tmpF4.ply',
    'images/models/tmp4.pcd',
    'images/models/tmpF5.ply',
    'images/models/tmp5.pcd',
    'images/models/tmpF6.ply',
    'images/models/tmp6.pcd',
    'images/models/tmpF7.ply',
    'images/models/tmp7.pcd',
    'images/models/tmpF8.ply',
    'images/models/tmp8.pcd',
    'images/models/tmpF9.ply',
    'images/models/tmp9.pcd',
    ]
load(paths[counter])
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if(keyCode == 78){
        counter = (counter + 1) % paths.length;
        scene.remove(mesh);
        if(paths[counter].split(".")[1] == "pcd"){
            loadpcd(paths[counter]);
        }else{
            load(paths[counter])
        }
        
        animate();
    }else if(keyCode == 16){
        controls.enableZoom = true;
        controls2.enableZoom = true;
    }
    
}
animate();



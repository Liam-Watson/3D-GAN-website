import * as THREE from './threejs/build/three.module.js';
// import {OBJLoader} from './three.js-master/examples/jsm/loaders/OBJLoader.js';
import {PLYLoader} from './threejs/examples/jsm/loaders/PLYLoader.js';
import {OrbitControls} from './threejs/examples/jsm/controls/OrbitControls.js';
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

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const material = new THREE.MeshLambertMaterial( { color: 0x808080 } );
let mesh = new THREE.Mesh( geometry, material );
// scene.add( cube );
const loader = new PLYLoader();
// let face = cube;
loader.load("face.ply", obj => {
    obj.computeVertexNormals();
    mesh = new THREE.Mesh(obj, material)
    mesh.scale.x = 17;
    mesh.scale.y = 17;
    mesh.scale.z = 17;

    scene.add(mesh);

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    // renderer.render( scene, camera );
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    // mesh.rotation.x += 0.1;
    // mesh.rotation.y += 0.005;
    // scene.remove(mesh);
    // scene.add(mesh);
    // mesh.matrixWorldNeedsUpdate = true;
    // mesh.updateMatrix();
    // console.log(mesh.rotation.x);
    renderer.render( scene, camera );
};
document.getElementsByTagName("canvas")[0].style.width = "100%"
document.getElementsByTagName("canvas")[0].style.height = "100%"
animate();



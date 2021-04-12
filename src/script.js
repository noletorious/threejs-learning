import "./styles.css";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import {
  MapControls,
  OrbitControls,
} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

//instantiate dat.gui
const gui = new dat.GUI();

//Create a clock to use so we can use a unit for animating with
const clock = new THREE.Clock();

//scene
const scene = new THREE.Scene();

//meshes
const redCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const greenCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const blueCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

//Dat.gui, add controllers
gui.add(redCube.position, "y", 0, 1, 0.01);

//group the cubes so you can rotate them altogether
const cubeGroup = new THREE.Group();
cubeGroup.add(redCube);
cubeGroup.add(greenCube);
cubeGroup.add(blueCube);

scene.add(cubeGroup);

//Dat.gui, add wireframe controllers
gui.add(redCube.material, "wireframe");

greenCube.position.x = -1.5;
blueCube.position.x = 1.5;

// * Axis Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Listen to when the when the viewport changes
window.addEventListener("resize", () => {
  //Update sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  //Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 8;

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

//controls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

//gsap to animate
gsap.to(cubeGroup.rotation, { duration: 3, x: 1.5, repeat: -1 });

const animate = () => {
  renderer.render(scene, camera);
  control.update();
  window.requestAnimationFrame(animate);
};
animate();

// Very basic way to animate per frame
// const animate = () => {
//   const elapsedTime = clock.getElapsedTime();
//   console.log(elapsedTime);
//   redCube.rotation.y = elapsedTime * Math.PI * 1;
//   blueCube.position.z = Math.sin(elapsedTime);
//   greenCube.position.z = Math.cos(elapsedTime);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(animate);
// };
// animate();

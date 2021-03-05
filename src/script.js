import "./styles.css";
import * as THREE from "three";
import gsap from "gsap";
import {MapControls, OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js"

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

scene.add(redCube);
scene.add(greenCube);
scene.add(blueCube);

greenCube.position.x = -1.5;
blueCube.position.x = 1.5;

//Axis Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//sizes
const sizes = {
  width: 800,
  height: 600,
};

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 8;

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

//controls
const control = new OrbitControls(camera, canvas)
control.enableDamping = true;

//gsap to animate
gsap.to(redCube.rotation, {  duration:10, y: 5 });

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

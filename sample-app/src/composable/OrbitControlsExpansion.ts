import { Quaternion, Spherical, Vector2, Vector3 } from "three";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class OrbitControlsExpansion extends OrbitControls {
  // this method is exposed, but perhaps it would be better if we can make it private...
  public mouseOverupdate: () => void;
  public handleMouseMoveRotate: (eventX: number, eventY: number) => void;

  constructor(object: PerspectiveCamera, domElement: HTMLElement) {
    super(object, domElement);

    if (domElement === undefined) console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.');

    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };

    const state = STATE.NONE;

    // current position in spherical coordinates
    const spherical = new Spherical();
    const sphericalDelta = new Spherical();

    let scale = 1;
    const panOffset = new Vector3();

    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();

    const getAutoRotationAngle = () => {
      return ((2 * Math.PI) / 60 / 60) * this.autoRotateSpeed;
    };

    const rotateLeft = (angle: number) => {
      sphericalDelta.theta -= angle;
    };

    const rotateUp = (angle: number) => {
      sphericalDelta.phi -= angle;
    };

    this.mouseOverupdate = () => {
      // const scope = this;
      const offset = new Vector3();

      // so camera.up is the orbit axis
      const quat = new Quaternion().setFromUnitVectors(object.up, new Vector3(0, 1, 0));

      const twoPI = 2 * Math.PI;

      return (this.mouseOverupdate = () => {
        const position = this.object.position;

        offset.copy(position).sub(this.target);
        // rotate offset to "y-axis-is-up" space
        offset.applyQuaternion(quat);

        // angle from z-axis around y-axis
        spherical.setFromVector3(offset);

        if (this.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }

        if (this.enableDamping) {
          spherical.theta += sphericalDelta.theta * this.dampingFactor;
          spherical.phi += sphericalDelta.phi * this.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        }

        // restrict theta to be between desired limits

        let min = this.minAzimuthAngle;
        let max = this.maxAzimuthAngle;

        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI) min += twoPI;
          else if (min > Math.PI) min -= twoPI;
          if (max < -Math.PI) max += twoPI;
          else if (max > Math.PI) max -= twoPI;
          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
          }
        }

        // restrict phi to be between desired limits
        spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, spherical.phi));
        spherical.makeSafe();

        spherical.radius *= scale;

        // restrict radius to be between desired limits
        spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, spherical.radius));
        // move target to panned location
        if (this.enableDamping === true) {
          this.target.addScaledVector(panOffset, this.dampingFactor);
        } else {
          this.target.add(panOffset);
        }
        offset.setFromSpherical(spherical);
        // rotate offset back to "camera-up-vecto;
        position.copy(this.target).add(offset);
        this.object.lookAt(this.target);
        if (this.enableDamping === true) {
          sphericalDelta.theta *= -this.dampingFactor;
          sphericalDelta.phi *= -this.dampingFactor;
          panOffset.multiplyScalar(1 - this.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }

        scale = 1;

        // update condition is:
        // min(camera displacement, camera rotation in radians)^2 > EPS
        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

        return false;
      });
    };

    this.handleMouseMoveRotate = (eventX, eventY) => {
      rotateEnd.set(eventX, eventY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(this.rotateSpeed);
      const element = this.domElement;
      if ("clientHeight" in element) {
        rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight);
      } // yes, height
      if ("clientHeight" in element) {
        rotateUp((2 * Math.PI * rotateDelta.y) / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
      this.mouseOverupdate();
    };
    this.mouseOverupdate();
  }
}

export { OrbitControlsExpansion };

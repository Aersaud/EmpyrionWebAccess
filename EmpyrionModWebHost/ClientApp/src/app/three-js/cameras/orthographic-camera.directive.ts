import { Directive, Input, forwardRef, HostListener, SimpleChanges } from '@angular/core';
import { AbstractCamera } from './abstract-camera';
import * as THREE from 'three';
import { WebGLRendererComponent } from '../renderer/webgl-renderer.component';

@Directive({
  selector: 'three-orthographic-camera',
  providers: [{ provide: AbstractCamera, useExisting: forwardRef(() => OrthographicCameraDirective) }]
})
export class OrthographicCameraDirective extends AbstractCamera<THREE.OrthographicCamera> {
  private _renderer: WebGLRendererComponent;
  // @Input() cameraTarget: THREE.Object3D;

  _fov: number;
  _near: number;
  _far: number;

  _positionX: number;
  _positionY: number;
  _positionZ: number;

  get fov()  { return this._fov; }
  get near() { return this._near; }
  get far()  { return this._far; }

  @Input() set fov (n: number) { this._fov = n;  this.UpdateCamera(); }
  @Input() set near(n: number) { this._near = n; this.UpdateCamera(); }
  @Input() set far (n: number) { this._far = n;  this.UpdateCamera(); }

  get positionX() { return this._positionX; }
  get positionY() { return this._positionY; }
  get positionZ() { return this._positionZ; }

  @Input() set positionX(n: number) { this._positionX = n; this.UpdateCamera(); }
  @Input() set positionY(n: number) { this._positionY = n; this.UpdateCamera(); }
  @Input() set positionZ(n: number) { this._positionZ = n; this.UpdateCamera(); }

  constructor() {
    console.log('OrthographicCameraDirective.constructor');
    super();
  }

  protected afterInit(): void {
    console.log('OrthographicCameraDirective.afterInit');
    // let aspectRatio = undefined; // Updated later
    this.camera = new THREE.OrthographicCamera(
      100, 100, 100, 100,
      this.near,
      this.far
    );

    // Set position and look at
    this.UpdateCamera();
  }

  public get rotation() {
    return this.camera.rotation;
  }

  private UpdateCamera() {
    if (!this.camera) return;

    this.camera.far  = this.far;
    this.camera.near = this.near;

    this.camera.position.x = this.positionX;
    this.camera.position.y = this.positionY;
    this.camera.position.z = this.positionZ;
    this.camera.updateProjectionMatrix();

    this.renderer.render();
  }

  @Input()
  public set renderer(newRenderer: WebGLRendererComponent) {
    this._renderer = newRenderer;
    this._renderer.render();
  }

  public get renderer() {
    return this._renderer;
  }

  public updateAspectRatio(aspect: number) {
    console.log('OrthographicCameraDirective.updateAspectRatio: ' + aspect);
    this.camera.updateProjectionMatrix();
  }


}

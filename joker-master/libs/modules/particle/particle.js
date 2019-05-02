//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle) {
    var Particle = (function () {
        function Particle() {
            this.matrix = new egret.Matrix();
            this.reset();
        }
        var d = __define,c=Particle,p=c.prototype;
        p.reset = function () {
            this.x = 0;
            this.y = 0;
            this.scale = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.currentTime = 0;
            this.totalTime = 1000;
        };
        p.$getMatrix = function (regX, regY) {
            var matrix = this.matrix;
            matrix.identity();
            if (this.rotation % 360) {
                var r = this.rotation;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            matrix.append(cos * this.scale, sin * this.scale, -sin * this.scale, cos * this.scale, this.x, this.y);
            if (regX || regY) {
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return Particle;
    }());
    particle.Particle = Particle;
    egret.registerClass(Particle,'particle.Particle');
})(particle || (particle = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle_1) {
    var ParticleSystem = (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem(texture, emissionRate) {
            _super.call(this);
            this._pool = [];
            this.frameTime = 0;
            this.particles = [];
            this._emitterX = 0;
            this._emitterY = 0;
            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            this.emissionTime = -1;
            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            this.maxParticles = 200;
            /**
             * 当前粒子数
             * @member {number} particle.ParticleSystem#numParticles
             */
            this.numParticles = 0;
            /**
             * 表示粒子类，如果设置创建粒子时将创建该类
             * @member {number} particle.ParticleSystem#particleClass
             */
            this.particleClass = null;
            this.particleMeasureRect = new egret.Rectangle();
            this.transformForMeasure = new egret.Matrix();
            this.setAlphaNodeList = [];
            this.bitmapNodeList = [];
            this.emissionRate = emissionRate;
            this.texture = texture;
            this.$renderNode = new egret.sys.GroupNode();
            //不清除绘制数据
            this.$renderNode.cleanBeforeRender = function () { };
        }
        var d = __define,c=ParticleSystem,p=c.prototype;
        p.getParticle = function () {
            var result;
            if (this._pool.length) {
                result = this._pool.pop();
            }
            else if (this.particleClass) {
                result = new this.particleClass();
            }
            else {
                result = new particle_1.Particle();
            }
            return result;
        };
        p.removeParticle = function (particle) {
            var index = this.particles.indexOf(particle);
            if (index != -1) {
                particle.reset();
                this.particles.splice(index, 1);
                this._pool.push(particle);
                this.numParticles--;
                return true;
            }
            else {
                return false;
            }
        };
        p.initParticle = function (particle) {
            particle.x = this.emitterX;
            particle.y = this.emitterY;
            particle.currentTime = 0;
            particle.totalTime = 1000;
        };
        /**
         * 更新当前显示对象坐标系下的边框界限
         * @param emitterRect {egret.Rectangle} 相对发射点坐标系下的界限
         */
        p.updateRelativeBounds = function (emitterRect) {
            if (emitterRect) {
                if (this.relativeContentBounds == null) {
                    this.relativeContentBounds = new egret.Rectangle();
                }
                this.relativeContentBounds.copyFrom(emitterRect);
                this.relativeContentBounds.x += this.emitterX;
                this.relativeContentBounds.y += this.emitterY;
            }
            else {
                this.relativeContentBounds = null;
            }
            this.mask = this.relativeContentBounds;
        };
        d(p, "emitterBounds"
            ,function () {
                return this._emitterBounds;
            }
            /**
             * 表示当前粒子系统中发射粒子的渲染边界范围，使用以发射点为基准的坐标系
             * @member {egret.Rectangle} particle.ParticleSystem#emitterBounds
             */
            ,function (rect) {
                this._emitterBounds = rect;
                this.updateRelativeBounds(rect);
            }
        );
        d(p, "emitterX"
            ,function () {
                return this._emitterX;
            }
            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            ,function (value) {
                this._emitterX = value;
                this.updateRelativeBounds(this.emitterBounds);
            }
        );
        d(p, "emitterY"
            ,function () {
                return this._emitterY;
            }
            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            ,function (value) {
                this._emitterY = value;
                this.updateRelativeBounds(this.emitterBounds);
            }
        );
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间
         */
        p.start = function (duration) {
            if (duration === void 0) { duration = -1; }
            if (this.emissionRate != 0) {
                this.emissionTime = duration;
                this.timeStamp = egret.getTimer();
                egret.startTick(this.update, this);
            }
        };
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        p.stop = function (clear) {
            if (clear === void 0) { clear = false; }
            this.emissionTime = 0;
            if (clear) {
                this.clear();
                egret.stopTick(this.update, this);
            }
        };
        p.update = function (timeStamp) {
            var dt = timeStamp - this.timeStamp;
            this.timeStamp = timeStamp;
            //粒子数很少的时候可能会错过添加粒子的时机
            if (this.emissionTime == -1 || this.emissionTime > 0) {
                this.frameTime += dt;
                while (this.frameTime > 0) {
                    if (this.numParticles < this.maxParticles) {
                        this.addOneParticle();
                    }
                    this.frameTime -= this.emissionRate;
                }
                if (this.emissionTime != -1) {
                    this.emissionTime -= dt;
                    if (this.emissionTime < 0) {
                        this.emissionTime = 0;
                    }
                }
            }
            var particle;
            var particleIndex = 0;
            while (particleIndex < this.numParticles) {
                particle = this.particles[particleIndex];
                if (particle.currentTime < particle.totalTime) {
                    this.advanceParticle(particle, dt);
                    particle.currentTime += dt;
                    particleIndex++;
                }
                else {
                    this.removeParticle(particle);
                }
            }
            this.$invalidateContentBounds();
            if (this.numParticles == 0 && this.emissionTime == 0) {
                egret.stopTick(this.update, this);
                this.dispatchEventWith(egret.Event.COMPLETE);
            }
            return false;
        };
        p.$measureContentBounds = function (bounds) {
            //如果设置了固定的区域边界则直接使用这个边界，否则进行自动的内容边界测量
            if (this.relativeContentBounds) {
                bounds.copyFrom(this.relativeContentBounds);
                return;
            }
            if (this.numParticles > 0) {
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var totalRect = egret.Rectangle.create();
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    this.transformForMeasure.identity();
                    this.appendTransform(this.transformForMeasure, particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                    this.particleMeasureRect.setEmpty();
                    this.particleMeasureRect.width = textureW;
                    this.particleMeasureRect.height = textureH;
                    var tmpRegion = egret.sys.Region.create();
                    tmpRegion.updateRegion(this.particleMeasureRect, this.transformForMeasure);
                    if (i == 0) {
                        totalRect.setTo(tmpRegion.minX, tmpRegion.minY, tmpRegion.maxX - tmpRegion.minX, tmpRegion.maxY - tmpRegion.minY);
                    }
                    else {
                        var l = Math.min(totalRect.x, tmpRegion.minX);
                        var t = Math.min(totalRect.y, tmpRegion.minY);
                        var r = Math.max(totalRect.right, tmpRegion.maxX);
                        var b = Math.max(totalRect.bottom, tmpRegion.maxY);
                        totalRect.setTo(l, t, r - l, b - t);
                    }
                    egret.sys.Region.release(tmpRegion);
                }
                //console.log(totalRect.x + "," + totalRect.y + "," + totalRect.width + "," + totalRect.height);
                bounds.setTo(totalRect.x, totalRect.y, totalRect.width, totalRect.height);
                egret.Rectangle.release(totalRect);
            }
        };
        p.setCurrentParticles = function (num) {
            for (var i = this.numParticles; i < num && this.numParticles < this.maxParticles; i++) {
                this.addOneParticle();
            }
        };
        /**
         * 更换粒子纹理
         * @param texture {egret.Texture} 新的纹理
         */
        p.changeTexture = function (texture) {
            if (this.texture != texture) {
                this.texture = texture;
                //todo 这里可以优化
                this.setAlphaNodeList.length = 0;
                this.bitmapNodeList.length = 0;
                this.$renderNode.drawData.length = 0;
            }
        };
        p.clear = function () {
            while (this.particles.length) {
                this.removeParticle(this.particles[0]);
            }
            this.numParticles = 0;
        };
        p.addOneParticle = function () {
            //todo 这里可能需要返回成功与否
            var particle = this.getParticle();
            this.initParticle(particle);
            if (particle.totalTime > 0) {
                this.particles.push(particle);
                this.numParticles++;
            }
        };
        p.advanceParticle = function (particle, dt) {
            particle.y -= dt / 6;
        };
        p.$render = function () {
            if (this.numParticles > 0) {
                //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                var texture = this.texture;
                var textureW = Math.round(texture.$getScaleBitmapWidth());
                var textureH = Math.round(texture.$getScaleBitmapHeight());
                var offsetX = texture._offsetX;
                var offsetY = texture._offsetY;
                var bitmapX = texture._bitmapX;
                var bitmapY = texture._bitmapY;
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;
                var particle;
                for (var i = 0; i < this.numParticles; i++) {
                    particle = this.particles[i];
                    var setAlphaNode;
                    var bitmapNode;
                    if (!this.bitmapNodeList[i]) {
                        this.setAlphaNodeList[i] = new egret.sys.SetAlphaNode();
                        bitmapNode = new egret.sys.BitmapNode();
                        this.bitmapNodeList[i] = bitmapNode;
                        this.$renderNode.addNode(this.setAlphaNodeList[i]);
                        this.$renderNode.addNode(this.bitmapNodeList[i]);
                        bitmapNode.image = texture._bitmapData;
                        bitmapNode.imageWidth = texture._sourceWidth;
                        bitmapNode.imageHeight = texture._sourceHeight;
                        bitmapNode.drawImage(bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                    }
                    setAlphaNode = this.setAlphaNodeList[i];
                    bitmapNode = this.bitmapNodeList[i];
                    setAlphaNode.setAlpha(particle.alpha);
                    bitmapNode.matrix = particle.$getMatrix(textureW / 2, textureH / 2);
                }
            }
        };
        p.appendTransform = function (matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (rotation % 360) {
                var r = rotation; // * Matrix.DEG_TO_RAD;
                var cos = egret.NumberUtils.cos(r);
                var sin = egret.NumberUtils.sin(r);
            }
            else {
                cos = 1;
                sin = 0;
            }
            if (skewX || skewY) {
                // TODO: can this be combined into a single append?
                //                skewX *= Matrix.DEG_TO_RAD;
                //                skewY *= Matrix.DEG_TO_RAD;
                matrix.append(egret.NumberUtils.cos(skewY), egret.NumberUtils.sin(skewY), -egret.NumberUtils.sin(skewX), egret.NumberUtils.cos(skewX), x, y);
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            }
            else {
                matrix.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (regX || regY) {
                // prepend the registration offset:
                matrix.tx -= regX * matrix.a + regY * matrix.c;
                matrix.ty -= regX * matrix.b + regY * matrix.d;
            }
            return matrix;
        };
        return ParticleSystem;
    }(egret.DisplayObject));
    particle_1.ParticleSystem = ParticleSystem;
    egret.registerClass(ParticleSystem,'particle.ParticleSystem');
})(particle || (particle = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle) {
    var GravityParticle = (function (_super) {
        __extends(GravityParticle, _super);
        function GravityParticle() {
            _super.apply(this, arguments);
        }
        var d = __define,c=GravityParticle,p=c.prototype;
        p.reset = function () {
            _super.prototype.reset.call(this);
            this.startX = 0;
            this.startY = 0;
            this.velocityX = 0;
            this.velocityY = 0;
            this.radialAcceleration = 0;
            this.tangentialAcceleration = 0;
            this.rotationDelta = 0;
            this.scaleDelta = 0;
        };
        return GravityParticle;
    }(particle.Particle));
    particle.GravityParticle = GravityParticle;
    egret.registerClass(GravityParticle,'particle.GravityParticle');
})(particle || (particle = {}));

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var particle;
(function (particle_1) {
    var GravityParticleSystem = (function (_super) {
        __extends(GravityParticleSystem, _super);
        function GravityParticleSystem(texture, config) {
            _super.call(this, texture, 200);
            this.parseConfig(config);
            this.emissionRate = this.lifespan / this.maxParticles;
            this.particleClass = particle_1.GravityParticle;
        }
        var d = __define,c=GravityParticleSystem,p=c.prototype;
        p.parseConfig = function (config) {
            this.emitterX = getValue(config.emitter.x);
            this.emitterY = getValue(config.emitter.y);
            this.emitterXVariance = getValue(config.emitterVariance.x);
            this.emitterYVariance = getValue(config.emitterVariance.y);
            this.gravityX = getValue(config.gravity.x);
            this.gravityY = getValue(config.gravity.y);
            if (config.useEmitterRect == true) {
                var bounds = new egret.Rectangle();
                bounds.x = getValue(config.emitterRect.x);
                bounds.y = getValue(config.emitterRect.y);
                bounds.width = getValue(config.emitterRect.width);
                bounds.height = getValue(config.emitterRect.height);
                this.emitterBounds = bounds;
            }
            this.maxParticles = getValue(config.maxParticles);
            this.speed = getValue(config.speed);
            this.speedVariance = getValue(config.speedVariance);
            this.lifespan = Math.max(0.01, getValue(config.lifespan));
            this.lifespanVariance = getValue(config.lifespanVariance);
            this.emitAngle = getValue(config.emitAngle);
            this.emitAngleVariance = getValue(config.emitAngleVariance);
            this.startSize = getValue(config.startSize);
            this.startSizeVariance = getValue(config.startSizeVariance);
            this.endSize = getValue(config.endSize);
            this.endSizeVariance = getValue(config.endSizeVariance);
            this.startRotation = getValue(config.startRotation);
            this.startRotationVariance = getValue(config.startRotationVariance);
            this.endRotation = getValue(config.endRotation);
            this.endRotationVariance = getValue(config.endRotationVariance);
            this.radialAcceleration = getValue(config.radialAcceleration);
            this.radialAccelerationVariance = getValue(config.radialAccelerationVariance);
            this.tangentialAcceleration = getValue(config.tangentialAcceleration);
            this.tangentialAccelerationVariance = getValue(config.tangentialAccelerationVariance);
            this.startAlpha = getValue(config.startAlpha);
            this.startAlphaVariance = getValue(config.startAlphaVariance);
            this.endAlpha = getValue(config.endAlpha);
            this.endAlphaVariance = getValue(config.endAlphaVariance);
            function getValue(value) {
                if (typeof value == "undefined") {
                    return 0;
                }
                return value;
            }
        };
        p.initParticle = function (particle) {
            var locParticle = particle;
            var lifespan = GravityParticleSystem.getValue(this.lifespan, this.lifespanVariance);
            locParticle.currentTime = 0;
            locParticle.totalTime = lifespan > 0 ? lifespan : 0;
            if (lifespan <= 0) {
                return;
            }
            locParticle.x = GravityParticleSystem.getValue(this.emitterX, this.emitterXVariance);
            locParticle.y = GravityParticleSystem.getValue(this.emitterY, this.emitterYVariance);
            locParticle.startX = this.emitterX;
            locParticle.startY = this.emitterY;
            var angle = GravityParticleSystem.getValue(this.emitAngle, this.emitAngleVariance);
            var speed = GravityParticleSystem.getValue(this.speed, this.speedVariance);
            locParticle.velocityX = speed * egret.NumberUtils.cos(angle);
            locParticle.velocityY = speed * egret.NumberUtils.sin(angle);
            locParticle.radialAcceleration = GravityParticleSystem.getValue(this.radialAcceleration, this.radialAccelerationVariance);
            locParticle.tangentialAcceleration = GravityParticleSystem.getValue(this.tangentialAcceleration, this.tangentialAccelerationVariance);
            var startSize = GravityParticleSystem.getValue(this.startSize, this.startSizeVariance);
            if (startSize < 0.1) {
                startSize = 0.1;
            }
            var endSize = GravityParticleSystem.getValue(this.endSize, this.endSizeVariance);
            if (endSize < 0.1) {
                endSize = 0.1;
            }
            var textureWidth = this.texture.textureWidth;
            locParticle.scale = startSize / textureWidth;
            locParticle.scaleDelta = ((endSize - startSize) / lifespan) / textureWidth;
            var startRotation = GravityParticleSystem.getValue(this.startRotation, this.startRotationVariance);
            var endRotation = GravityParticleSystem.getValue(this.endRotation, this.endRotationVariance);
            locParticle.rotation = startRotation;
            locParticle.rotationDelta = (endRotation - startRotation) / lifespan;
            var startAlpha = GravityParticleSystem.getValue(this.startAlpha, this.startAlphaVariance);
            var endAlpha = GravityParticleSystem.getValue(this.endAlpha, this.endAlphaVariance);
            locParticle.alpha = startAlpha;
            locParticle.alphaDelta = (endAlpha - startAlpha) / lifespan;
        };
        GravityParticleSystem.getValue = function (base, variance) {
            return base + variance * (Math.random() * 2 - 1);
        };
        p.advanceParticle = function (particle, dt) {
            var locParticle = particle;
            dt = dt / 1000;
            var restTime = locParticle.totalTime - locParticle.currentTime;
            dt = restTime > dt ? dt : restTime;
            locParticle.currentTime += dt;
            var distanceX = locParticle.x - locParticle.startX;
            var distanceY = locParticle.y - locParticle.startY;
            var distanceScalar = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) {
                distanceScalar = 0.01;
            }
            var radialX = distanceX / distanceScalar;
            var radialY = distanceY / distanceScalar;
            var tangentialX = radialX;
            var tangentialY = radialY;
            radialX *= locParticle.radialAcceleration;
            radialY *= locParticle.radialAcceleration;
            var temp = tangentialX;
            tangentialX = -tangentialY * locParticle.tangentialAcceleration;
            tangentialY = temp * locParticle.tangentialAcceleration;
            locParticle.velocityX += dt * (this.gravityX + radialX + tangentialX);
            locParticle.velocityY += dt * (this.gravityY + radialY + tangentialY);
            locParticle.x += locParticle.velocityX * dt;
            locParticle.y += locParticle.velocityY * dt;
            locParticle.scale += locParticle.scaleDelta * dt * 1000;
            if (locParticle.scale < 0) {
                locParticle.scale = 0;
            }
            locParticle.rotation += locParticle.rotationDelta * dt * 1000;
            locParticle.alpha += locParticle.alphaDelta * dt * 1000;
        };
        return GravityParticleSystem;
    }(particle_1.ParticleSystem));
    particle_1.GravityParticleSystem = GravityParticleSystem;
    egret.registerClass(GravityParticleSystem,'particle.GravityParticleSystem');
})(particle || (particle = {}));


var particle;!function(t){var e=function(){function t(){this.matrix=new egret.Matrix,this.reset()}var e=(__define,t),i=e.prototype;return i.reset=function(){this.x=0,this.y=0,this.scale=1,this.rotation=0,this.alpha=1,this.currentTime=0,this.totalTime=1e3},i.$getMatrix=function(t,e){var i=this.matrix;if(i.identity(),this.rotation%360)var a=this.rotation,r=egret.NumberUtils.cos(a),s=egret.NumberUtils.sin(a);else r=1,s=0;return i.append(r*this.scale,s*this.scale,-s*this.scale,r*this.scale,this.x,this.y),(t||e)&&(i.tx-=t*i.a+e*i.c,i.ty-=t*i.b+e*i.d),i},t}();t.Particle=e,egret.registerClass(e,"particle.Particle")}(particle||(particle={}));var particle;!function(t){var e=function(e){function i(t,i){e.call(this),this._pool=[],this.frameTime=0,this.particles=[],this._emitterX=0,this._emitterY=0,this.emissionTime=-1,this.maxParticles=200,this.numParticles=0,this.particleClass=null,this.particleMeasureRect=new egret.Rectangle,this.transformForMeasure=new egret.Matrix,this.setAlphaNodeList=[],this.bitmapNodeList=[],this.emissionRate=i,this.texture=t,this.$renderNode=new egret.sys.GroupNode,this.$renderNode.cleanBeforeRender=function(){}}__extends(i,e);var a=__define,r=i,s=r.prototype;return s.getParticle=function(){var e;return e=this._pool.length?this._pool.pop():this.particleClass?new this.particleClass:new t.Particle},s.removeParticle=function(t){var e=this.particles.indexOf(t);return-1!=e?(t.reset(),this.particles.splice(e,1),this._pool.push(t),this.numParticles--,!0):!1},s.initParticle=function(t){t.x=this.emitterX,t.y=this.emitterY,t.currentTime=0,t.totalTime=1e3},s.updateRelativeBounds=function(t){t?(null==this.relativeContentBounds&&(this.relativeContentBounds=new egret.Rectangle),this.relativeContentBounds.copyFrom(t),this.relativeContentBounds.x+=this.emitterX,this.relativeContentBounds.y+=this.emitterY):this.relativeContentBounds=null,this.mask=this.relativeContentBounds},a(s,"emitterBounds",function(){return this._emitterBounds},function(t){this._emitterBounds=t,this.updateRelativeBounds(t)}),a(s,"emitterX",function(){return this._emitterX},function(t){this._emitterX=t,this.updateRelativeBounds(this.emitterBounds)}),a(s,"emitterY",function(){return this._emitterY},function(t){this._emitterY=t,this.updateRelativeBounds(this.emitterBounds)}),s.start=function(t){void 0===t&&(t=-1),0!=this.emissionRate&&(this.emissionTime=t,this.timeStamp=egret.getTimer(),egret.startTick(this.update,this))},s.stop=function(t){void 0===t&&(t=!1),this.emissionTime=0,t&&(this.clear(),egret.stopTick(this.update,this))},s.update=function(t){var e=t-this.timeStamp;if(this.timeStamp=t,-1==this.emissionTime||this.emissionTime>0){for(this.frameTime+=e;this.frameTime>0;)this.numParticles<this.maxParticles&&this.addOneParticle(),this.frameTime-=this.emissionRate;-1!=this.emissionTime&&(this.emissionTime-=e,this.emissionTime<0&&(this.emissionTime=0))}for(var i,a=0;a<this.numParticles;)i=this.particles[a],i.currentTime<i.totalTime?(this.advanceParticle(i,e),i.currentTime+=e,a++):this.removeParticle(i);return this.$invalidateContentBounds(),0==this.numParticles&&0==this.emissionTime&&(egret.stopTick(this.update,this),this.dispatchEventWith(egret.Event.COMPLETE)),!1},s.$measureContentBounds=function(t){if(this.relativeContentBounds)return void t.copyFrom(this.relativeContentBounds);if(this.numParticles>0){for(var e,i=this.texture,a=Math.round(i.$getScaleBitmapWidth()),r=Math.round(i.$getScaleBitmapHeight()),s=egret.Rectangle.create(),n=0;n<this.numParticles;n++){e=this.particles[n],this.transformForMeasure.identity(),this.appendTransform(this.transformForMeasure,e.x,e.y,e.scale,e.scale,e.rotation,0,0,a/2,r/2),this.particleMeasureRect.setEmpty(),this.particleMeasureRect.width=a,this.particleMeasureRect.height=r;var h=egret.sys.Region.create();if(h.updateRegion(this.particleMeasureRect,this.transformForMeasure),0==n)s.setTo(h.minX,h.minY,h.maxX-h.minX,h.maxY-h.minY);else{var l=Math.min(s.x,h.minX),c=Math.min(s.y,h.minY),o=Math.max(s.right,h.maxX),m=Math.max(s.bottom,h.maxY);s.setTo(l,c,o-l,m-c)}egret.sys.Region.release(h)}t.setTo(s.x,s.y,s.width,s.height),egret.Rectangle.release(s)}},s.setCurrentParticles=function(t){for(var e=this.numParticles;t>e&&this.numParticles<this.maxParticles;e++)this.addOneParticle()},s.changeTexture=function(t){this.texture!=t&&(this.texture=t,this.setAlphaNodeList.length=0,this.bitmapNodeList.length=0,this.$renderNode.drawData.length=0)},s.clear=function(){for(;this.particles.length;)this.removeParticle(this.particles[0]);this.numParticles=0},s.addOneParticle=function(){var t=this.getParticle();this.initParticle(t),t.totalTime>0&&(this.particles.push(t),this.numParticles++)},s.advanceParticle=function(t,e){t.y-=e/6},s.$render=function(){if(this.numParticles>0)for(var t,e=this.texture,i=Math.round(e.$getScaleBitmapWidth()),a=Math.round(e.$getScaleBitmapHeight()),r=e._offsetX,s=e._offsetY,n=e._bitmapX,h=e._bitmapY,l=e._bitmapWidth,c=e._bitmapHeight,o=0;o<this.numParticles;o++){t=this.particles[o];var m,u;this.bitmapNodeList[o]||(this.setAlphaNodeList[o]=new egret.sys.SetAlphaNode,u=new egret.sys.BitmapNode,this.bitmapNodeList[o]=u,this.$renderNode.addNode(this.setAlphaNodeList[o]),this.$renderNode.addNode(this.bitmapNodeList[o]),u.image=e._bitmapData,u.imageWidth=e._sourceWidth,u.imageHeight=e._sourceHeight,u.drawImage(n,h,l,c,r,s,i,a)),m=this.setAlphaNodeList[o],u=this.bitmapNodeList[o],m.setAlpha(t.alpha),u.matrix=t.$getMatrix(i/2,a/2)}},s.appendTransform=function(t,e,i,a,r,s,n,h,l,c){if(s%360)var o=s,m=egret.NumberUtils.cos(o),u=egret.NumberUtils.sin(o);else m=1,u=0;return n||h?(t.append(egret.NumberUtils.cos(h),egret.NumberUtils.sin(h),-egret.NumberUtils.sin(n),egret.NumberUtils.cos(n),e,i),t.append(m*a,u*a,-u*r,m*r,0,0)):t.append(m*a,u*a,-u*r,m*r,e,i),(l||c)&&(t.tx-=l*t.a+c*t.c,t.ty-=l*t.b+c*t.d),t},i}(egret.DisplayObject);t.ParticleSystem=e,egret.registerClass(e,"particle.ParticleSystem")}(particle||(particle={}));var particle;!function(t){var e=function(t){function e(){t.apply(this,arguments)}__extends(e,t);var i=(__define,e),a=i.prototype;return a.reset=function(){t.prototype.reset.call(this),this.startX=0,this.startY=0,this.velocityX=0,this.velocityY=0,this.radialAcceleration=0,this.tangentialAcceleration=0,this.rotationDelta=0,this.scaleDelta=0},e}(t.Particle);t.GravityParticle=e,egret.registerClass(e,"particle.GravityParticle")}(particle||(particle={}));var particle;!function(t){var e=function(e){function i(i,a){e.call(this,i,200),this.parseConfig(a),this.emissionRate=this.lifespan/this.maxParticles,this.particleClass=t.GravityParticle}__extends(i,e);var a=(__define,i),r=a.prototype;return r.parseConfig=function(t){function e(t){return"undefined"==typeof t?0:t}if(this.emitterX=e(t.emitter.x),this.emitterY=e(t.emitter.y),this.emitterXVariance=e(t.emitterVariance.x),this.emitterYVariance=e(t.emitterVariance.y),this.gravityX=e(t.gravity.x),this.gravityY=e(t.gravity.y),1==t.useEmitterRect){var i=new egret.Rectangle;i.x=e(t.emitterRect.x),i.y=e(t.emitterRect.y),i.width=e(t.emitterRect.width),i.height=e(t.emitterRect.height),this.emitterBounds=i}this.maxParticles=e(t.maxParticles),this.speed=e(t.speed),this.speedVariance=e(t.speedVariance),this.lifespan=Math.max(.01,e(t.lifespan)),this.lifespanVariance=e(t.lifespanVariance),this.emitAngle=e(t.emitAngle),this.emitAngleVariance=e(t.emitAngleVariance),this.startSize=e(t.startSize),this.startSizeVariance=e(t.startSizeVariance),this.endSize=e(t.endSize),this.endSizeVariance=e(t.endSizeVariance),this.startRotation=e(t.startRotation),this.startRotationVariance=e(t.startRotationVariance),this.endRotation=e(t.endRotation),this.endRotationVariance=e(t.endRotationVariance),this.radialAcceleration=e(t.radialAcceleration),this.radialAccelerationVariance=e(t.radialAccelerationVariance),this.tangentialAcceleration=e(t.tangentialAcceleration),this.tangentialAccelerationVariance=e(t.tangentialAccelerationVariance),this.startAlpha=e(t.startAlpha),this.startAlphaVariance=e(t.startAlphaVariance),this.endAlpha=e(t.endAlpha),this.endAlphaVariance=e(t.endAlphaVariance)},r.initParticle=function(t){var e=t,a=i.getValue(this.lifespan,this.lifespanVariance);if(e.currentTime=0,e.totalTime=a>0?a:0,!(0>=a)){e.x=i.getValue(this.emitterX,this.emitterXVariance),e.y=i.getValue(this.emitterY,this.emitterYVariance),e.startX=this.emitterX,e.startY=this.emitterY;var r=i.getValue(this.emitAngle,this.emitAngleVariance),s=i.getValue(this.speed,this.speedVariance);e.velocityX=s*egret.NumberUtils.cos(r),e.velocityY=s*egret.NumberUtils.sin(r),e.radialAcceleration=i.getValue(this.radialAcceleration,this.radialAccelerationVariance),e.tangentialAcceleration=i.getValue(this.tangentialAcceleration,this.tangentialAccelerationVariance);var n=i.getValue(this.startSize,this.startSizeVariance);.1>n&&(n=.1);var h=i.getValue(this.endSize,this.endSizeVariance);.1>h&&(h=.1);var l=this.texture.textureWidth;e.scale=n/l,e.scaleDelta=(h-n)/a/l;var c=i.getValue(this.startRotation,this.startRotationVariance),o=i.getValue(this.endRotation,this.endRotationVariance);e.rotation=c,e.rotationDelta=(o-c)/a;var m=i.getValue(this.startAlpha,this.startAlphaVariance),u=i.getValue(this.endAlpha,this.endAlphaVariance);e.alpha=m,e.alphaDelta=(u-m)/a}},i.getValue=function(t,e){return t+e*(2*Math.random()-1)},r.advanceParticle=function(t,e){var i=t;e/=1e3;var a=i.totalTime-i.currentTime;e=a>e?e:a,i.currentTime+=e;var r=i.x-i.startX,s=i.y-i.startY,n=Math.sqrt(r*r+s*s);.01>n&&(n=.01);var h=r/n,l=s/n,c=h,o=l;h*=i.radialAcceleration,l*=i.radialAcceleration;var m=c;c=-o*i.tangentialAcceleration,o=m*i.tangentialAcceleration,i.velocityX+=e*(this.gravityX+h+c),i.velocityY+=e*(this.gravityY+l+o),i.x+=i.velocityX*e,i.y+=i.velocityY*e,i.scale+=i.scaleDelta*e*1e3,i.scale<0&&(i.scale=0),i.rotation+=i.rotationDelta*e*1e3,i.alpha+=i.alphaDelta*e*1e3},i}(t.ParticleSystem);t.GravityParticleSystem=e,egret.registerClass(e,"particle.GravityParticleSystem")}(particle||(particle={}));

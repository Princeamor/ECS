System.register([],(function(t,a){"use strict";return{execute:function(){t({$:
/**
       * Create a new mat3 with the given values
       *
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m10 Component in column 1, row 0 position (index 3)
       * @param {Number} m11 Component in column 1, row 1 position (index 4)
       * @param {Number} m12 Component in column 1, row 2 position (index 5)
       * @param {Number} m20 Component in column 2, row 0 position (index 6)
       * @param {Number} m21 Component in column 2, row 1 position (index 7)
       * @param {Number} m22 Component in column 2, row 2 position (index 8)
       * @returns {mat3} A new mat3
       */
function(t,a,n,u,e,o,h,i,s){var M=new r(9);return M[0]=t,M[1]=a,M[2]=n,M[3]=u,M[4]=e,M[5]=o,M[6]=h,M[7]=i,M[8]=s,M}
/**
       * Inverts a mat3
       *
       * @param {mat3} out the receiving matrix
       * @param {ReadonlyMat3} a the source matrix
       * @returns {mat3 | null} out, or null if source matrix is not invertible
       */,A:R,B:l,C:
/**
       * Copy the values from one vec3 to another
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the source vector
       * @returns {vec3} out
       */
function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t}
/**
       * Set the components of a vec3 to the given values
       *
       * @param {vec3} out the receiving vector
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @returns {vec3} out
       */,D:C,E:
/**
       * Transforms the vec3 with a mat3.
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the vector to transform
       * @param {ReadonlyMat3} m the 3x3 matrix to transform with
       * @returns {vec3} out
       */
function(t,a,r){var n=a[0],u=a[1],e=a[2];return t[0]=n*r[0]+u*r[3]+e*r[6],t[1]=n*r[1]+u*r[4]+e*r[7],t[2]=n*r[2]+u*r[5]+e*r[8],t}
/**
       * Transforms the vec3 with a quat
       * Can also be used for dual quaternions. (Multiply it with the real part)
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the vector to transform
       * @param {ReadonlyQuat} q normalized quaternion to transform with
       * @returns {vec3} out
       */,F:
/**
       * Copies the upper-left 3x3 values into the given mat3.
       *
       * @param {mat3} out the receiving 3x3 matrix
       * @param {ReadonlyMat4} a   the source 4x4 matrix
       * @returns {mat3} out
       */
function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[4],t[4]=a[5],t[5]=a[6],t[6]=a[8],t[7]=a[9],t[8]=a[10],t}
/**
       * Creates a new mat3 initialized with values from an existing matrix
       *
       * @param {ReadonlyMat3} a matrix to clone
       * @returns {mat3} a new 3x3 matrix
       */,G:u,H:
/**
       * Adds two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {vec3} out
       */
function(t,a,r){return t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t}
/**
       * Subtracts vector b from vector a
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {vec3} out
       */,I:O,J:
/**
       * Returns whether or not the vectors have approximately the same elements in the same position.
       *
       * @param {ReadonlyVec3} a The first vector.
       * @param {ReadonlyVec3} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */
function(t,r){var n=t[0],u=t[1],e=t[2],o=r[0],h=r[1],i=r[2];return Math.abs(n-o)<=a*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(u-h)<=a*Math.max(1,Math.abs(u),Math.abs(h))&&Math.abs(e-i)<=a*Math.max(1,Math.abs(e),Math.abs(i))}
/**
       * Alias for {@link vec3.subtract}
       * @function
       */,K:function(t,a,r){// Fast Vector Rotation using Quaternions by Robert Eisele
// https://raw.org/proof/vector-rotation-using-quaternions/
var n=r[0],u=r[1],e=r[2],o=r[3],h=a[0],i=a[1],s=a[2],M=u*s-e*i,c=e*h-n*s,f=n*i-u*h;// t = 2t
return M+=M,c+=c,f+=f,// v + w t + q x t
t[0]=h+o*M+u*f-e*c,t[1]=i+o*c+e*M-n*f,t[2]=s+o*f+n*c-u*M,t},N:
/**
       * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
       *
       * @param {quat} out the receiving quaternion
       * @param {Number} x Angle to rotate around X axis in degrees.
       * @param {Number} y Angle to rotate around Y axis in degrees.
       * @param {Number} z Angle to rotate around Z axis in degrees.
       * @param {'xyz'|'xzy'|'yxz'|'yzx'|'zxy'|'zyx'} order Intrinsic order for conversion, default is zyx.
       * @returns {quat} out
       * @function
       */
function(t,a,r,u){var e=arguments.length>4&&void 0!==arguments[4]?arguments[4]:n,o=Math.PI/360;a*=o,u*=o,r*=o;var h=Math.sin(a),i=Math.cos(a),s=Math.sin(r),M=Math.cos(r),c=Math.sin(u),f=Math.cos(u);switch(e){case"xyz":t[0]=h*M*f+i*s*c,t[1]=i*s*f-h*M*c,t[2]=i*M*c+h*s*f,t[3]=i*M*f-h*s*c;break;case"xzy":t[0]=h*M*f-i*s*c,t[1]=i*s*f-h*M*c,t[2]=i*M*c+h*s*f,t[3]=i*M*f+h*s*c;break;case"yxz":t[0]=h*M*f+i*s*c,t[1]=i*s*f-h*M*c,t[2]=i*M*c-h*s*f,t[3]=i*M*f+h*s*c;break;case"yzx":t[0]=h*M*f+i*s*c,t[1]=i*s*f+h*M*c,t[2]=i*M*c-h*s*f,t[3]=i*M*f-h*s*c;break;case"zxy":t[0]=h*M*f-i*s*c,t[1]=i*s*f+h*M*c,t[2]=i*M*c+h*s*f,t[3]=i*M*f-h*s*c;break;case"zyx":t[0]=h*M*f-i*s*c,t[1]=i*s*f+h*M*c,t[2]=i*M*c-h*s*f,t[3]=i*M*f+h*s*c;break;default:throw new Error("Unknown angle order "+e)}return t}
/**
       * Creates a new quat initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {quat} a new quaternion
       * @function
       */,P:function(t,a,r,n){return t[0]=a,t[1]=r,t[2]=n,t},Q:
/**
       * Multiplies two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {vec3} out
       */
function(t,a,r){return t[0]=a[0]*r[0],t[1]=a[1]*r[1],t[2]=a[2]*r[2],t}
/**
       * Returns the minimum of two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {vec3} out
       */,R:
/**
       * Set the components of a vec2 to the given values
       *
       * @param {vec2} out the receiving vector
       * @param {Number} x X component
       * @param {Number} y Y component
       * @returns {vec2} out
       */
function(t,a,r){return t[0]=a,t[1]=r,t}
/**
       * Normalize a vec2
       *
       * @param {vec2} out the receiving vector
       * @param {ReadonlyVec2} a vector to normalize
       * @returns {vec2} out
       */,S:
/**
       * Copy the values from one vec2 to another
       *
       * @param {vec2} out the receiving vector
       * @param {ReadonlyVec2} a the source vector
       * @returns {vec2} out
       */
function(t,a){return t[0]=a[0],t[1]=a[1],t},T:k,U:z,V:S,W:h,Y:
/**
       * Calculates the inverse of a quat
       *
       * @param {quat} out the receiving quaternion
       * @param {ReadonlyQuat} a quat to calculate inverse of
       * @returns {quat} out
       */
function(t,a){var r=a[0],n=a[1],u=a[2],e=a[3],o=r*r+n*n+u*u+e*e,h=o?1/o:0;// TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
return t[0]=-r*h,t[1]=-n*h,t[2]=-u*h,t[3]=e*h,t}
/**
       * Creates a quaternion from the given 3x3 rotation matrix.
       *
       * NOTE: The resultant quaternion is not normalized, so you should be sure
       * to renormalize the quaternion yourself where necessary.
       *
       * @param {quat} out the receiving quaternion
       * @param {ReadonlyMat3} m rotation matrix
       * @returns {quat} out
       * @function
       */,_:
/**
       * Creates a new vec3 initialized with values from an existing vector
       *
       * @param {ReadonlyVec3} a vector to clone
       * @returns {vec3} a new 3D vector
       */
function(t){var a=new r(3);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a}
/**
       * Calculates the length of a vec3
       *
       * @param {ReadonlyVec3} a vector to calculate length of
       * @returns {Number} length of a
       */,a:e,a1:
/**
       * Returns the maximum of two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {vec3} out
       */
function(t,a,r){return t[0]=Math.max(a[0],r[0]),t[1]=Math.max(a[1],r[1]),t[2]=Math.max(a[2],r[2]),t}
/**
       * Scales a vec3 by a scalar number
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the vector to scale
       * @param {Number} b amount to scale the vector by
       * @returns {vec3} out
       */,a2:function(t,a,r){return t[0]=Math.min(a[0],r[0]),t[1]=Math.min(a[1],r[1]),t[2]=Math.min(a[2],r[2]),t},a3:function(t,a,r){return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t}
/**
       * Calculates the euclidian distance between two vec3's
       *
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {Number} distance between a and b
       */,a5:w,a6:A,a7:p,a8:g,a9:d,aa:s,ad:
/**
       * Performs a linear interpolation between two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
       * @returns {vec3} out
       */
function(t,a,r,n){var u=a[0],e=a[1],o=a[2];return t[0]=u+n*(r[0]-u),t[1]=e+n*(r[1]-e),t[2]=o+n*(r[2]-o),t}
/**
       * Transforms the vec3 with a mat4.
       * 4th vector component is implicitly '1'
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the vector to transform
       * @param {ReadonlyMat4} m matrix to transform with
       * @returns {vec3} out
       */,ae:v,af:c,ag:H,ah:o,aj:m,ak:E,al:i,am:
/**
       * Creates a matrix from a vector translation
       * This is equivalent to (but much faster than):
       *
       *     mat3.identity(dest);
       *     mat3.translate(dest, dest, vec);
       *
       * @param {mat3} out mat3 receiving operation result
       * @param {ReadonlyVec2} v Translation vector
       * @returns {mat3} out
       */
function(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=a[0],t[7]=a[1],t[8]=1,t}
/**
       * Creates a matrix from a given angle
       * This is equivalent to (but much faster than):
       *
       *     mat3.identity(dest);
       *     mat3.rotate(dest, dest, rad);
       *
       * @param {mat3} out mat3 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat3} out
       */,an:
/**
       * Creates a matrix from a vector scaling
       * This is equivalent to (but much faster than):
       *
       *     mat3.identity(dest);
       *     mat3.scale(dest, dest, vec);
       *
       * @param {mat3} out mat3 receiving operation result
       * @param {ReadonlyVec2} v Scaling vector
       * @returns {mat3} out
       */
function(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=a[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}
/**
       * Alias for {@link mat3.multiply}
       * @function
       */,ao:function(t,a){var r=Math.sin(a),n=Math.cos(a);return t[0]=n,t[1]=r,t[2]=0,t[3]=-r,t[4]=n,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},aq:function(t,a){var r=a[0],n=a[1],u=a[2],e=a[3],o=a[4],h=a[5],i=a[6],s=a[7],M=a[8],c=M*o-h*s,f=-M*e+h*i,v=s*e-o*i,b=r*c+n*f+u*v;return b?(b=1/b,t[0]=c*b,t[1]=(-M*n+u*s)*b,t[2]=(h*n-u*o)*b,t[3]=f*b,t[4]=(M*r-u*i)*b,t[5]=(-h*r+u*e)*b,t[6]=v*b,t[7]=(-s*r+n*i)*b,t[8]=(o*r-n*e)*b,t):null}
/**
       * Multiplies two mat3's
       *
       * @param {mat3} out the receiving matrix
       * @param {ReadonlyMat3} a the first operand
       * @param {ReadonlyMat3} b the second operand
       * @returns {mat3} out
       */,ar:function(t){var a=new r(9);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a},b:J,c:X,d:
/**
       * Calculates the dot product of two vec2's
       *
       * @param {ReadonlyVec2} a the first operand
       * @param {ReadonlyVec2} b the second operand
       * @returns {Number} dot product of a and b
       */
function(t,a){return t[0]*a[0]+t[1]*a[1]}
/**
       * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
       *
       * @param {ReadonlyVec2} a The first vector.
       * @param {ReadonlyVec2} b The second vector.
       * @returns {Boolean} True if the vectors are equal, false otherwise.
       */,e:function(t,a){return t[0]===a[0]&&t[1]===a[1]}
/**
       * Perform some operation over an array of vec2s.
       *
       * @param {Array} a the array of vectors to iterate over
       * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
       * @param {Number} offset Number of elements to skip at the beginning of the array
       * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
       * @param {Function} fn Function to call for each vector in the array
       * @param {Object} [arg] additional argument to pass to fn
       * @returns {Array} a
       * @function
       */,f:L,g:U,h:tt,i:K,j:f,k:y,l:G,m:b,n:function(t,a){var r=a[0],n=a[1],u=r*r+n*n;return u>0&&(//TODO: evaluate use of glm_invsqrt here?
u=1/Math.sqrt(u)),t[0]=a[0]*u,t[1]=a[1]*u,t},o:Y,q:D,r:q,s:B,t:
/**
       * Transforms the vec4 with a mat4.
       *
       * @param {vec4} out the receiving vector
       * @param {ReadonlyVec4} a the vector to transform
       * @param {ReadonlyMat4} m matrix to transform with
       * @returns {vec4} out
       */
function(t,a,r){var n=a[0],u=a[1],e=a[2],o=a[3];return t[0]=r[0]*n+r[4]*u+r[8]*e+r[12]*o,t[1]=r[1]*n+r[5]*u+r[9]*e+r[13]*o,t[2]=r[2]*n+r[6]*u+r[10]*e+r[14]*o,t[3]=r[3]*n+r[7]*u+r[11]*e+r[15]*o,t}
/**
       * Perform some operation over an array of vec4s.
       *
       * @param {Array} a the array of vectors to iterate over
       * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
       * @param {Number} offset Number of elements to skip at the beginning of the array
       * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
       * @param {Function} fn Function to call for each vector in the array
       * @param {Object} [arg] additional argument to pass to fn
       * @returns {Array} a
       * @function
       */,u:x,v:function(t,a,r){var n=a[0],u=a[1],e=a[2],o=r[3]*n+r[7]*u+r[11]*e+r[15];return o=o||1,t[0]=(r[0]*n+r[4]*u+r[8]*e+r[12])/o,t[1]=(r[1]*n+r[5]*u+r[9]*e+r[13])/o,t[2]=(r[2]*n+r[6]*u+r[10]*e+r[14])/o,t},w:Z,x:W,y:M,z:$});
/**
       * Common utilities
       * @module glMatrix
       */
// Configuration Constants
var a=1e-6,r="undefined"!=typeof Float32Array?Float32Array:Array,n="zyx";
/**
       * 3x3 Matrix
       * @module mat3
       */
/**
       * Creates a new identity mat3
       *
       * @returns {mat3} a new 3x3 matrix
       */
function u(){var t=new r(9);return r!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}
/**
       * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
       * @module mat4
       */
/**
       * Creates a new identity mat4
       *
       * @returns {mat4} a new 4x4 matrix
       */
function e(){var t=new r(16);return r!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}
/**
       * Creates a new mat4 initialized with values from an existing matrix
       *
       * @param {ReadonlyMat4} a matrix to clone
       * @returns {mat4} a new 4x4 matrix
       */function o(t){var a=new r(16);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15],a}
/**
       * Copy the values from one mat4 to another
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the source matrix
       * @returns {mat4} out
       */function h(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}
/**
       * Create a new mat4 with the given values
       *
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m03 Component in column 0, row 3 position (index 3)
       * @param {Number} m10 Component in column 1, row 0 position (index 4)
       * @param {Number} m11 Component in column 1, row 1 position (index 5)
       * @param {Number} m12 Component in column 1, row 2 position (index 6)
       * @param {Number} m13 Component in column 1, row 3 position (index 7)
       * @param {Number} m20 Component in column 2, row 0 position (index 8)
       * @param {Number} m21 Component in column 2, row 1 position (index 9)
       * @param {Number} m22 Component in column 2, row 2 position (index 10)
       * @param {Number} m23 Component in column 2, row 3 position (index 11)
       * @param {Number} m30 Component in column 3, row 0 position (index 12)
       * @param {Number} m31 Component in column 3, row 1 position (index 13)
       * @param {Number} m32 Component in column 3, row 2 position (index 14)
       * @param {Number} m33 Component in column 3, row 3 position (index 15)
       * @returns {mat4} A new mat4
       */function i(t,a,n,u,e,o,h,i,s,M,c,f,v,b,l,m){var x=new r(16);return x[0]=t,x[1]=a,x[2]=n,x[3]=u,x[4]=e,x[5]=o,x[6]=h,x[7]=i,x[8]=s,x[9]=M,x[10]=c,x[11]=f,x[12]=v,x[13]=b,x[14]=l,x[15]=m,x}
/**
       * Set the components of a mat4 to the given values
       *
       * @param {mat4} out the receiving matrix
       * @param {Number} m00 Component in column 0, row 0 position (index 0)
       * @param {Number} m01 Component in column 0, row 1 position (index 1)
       * @param {Number} m02 Component in column 0, row 2 position (index 2)
       * @param {Number} m03 Component in column 0, row 3 position (index 3)
       * @param {Number} m10 Component in column 1, row 0 position (index 4)
       * @param {Number} m11 Component in column 1, row 1 position (index 5)
       * @param {Number} m12 Component in column 1, row 2 position (index 6)
       * @param {Number} m13 Component in column 1, row 3 position (index 7)
       * @param {Number} m20 Component in column 2, row 0 position (index 8)
       * @param {Number} m21 Component in column 2, row 1 position (index 9)
       * @param {Number} m22 Component in column 2, row 2 position (index 10)
       * @param {Number} m23 Component in column 2, row 3 position (index 11)
       * @param {Number} m30 Component in column 3, row 0 position (index 12)
       * @param {Number} m31 Component in column 3, row 1 position (index 13)
       * @param {Number} m32 Component in column 3, row 2 position (index 14)
       * @param {Number} m33 Component in column 3, row 3 position (index 15)
       * @returns {mat4} out
       */function s(t,a,r,n,u,e,o,h,i,s,M,c,f,v,b,l,m){return t[0]=a,t[1]=r,t[2]=n,t[3]=u,t[4]=e,t[5]=o,t[6]=h,t[7]=i,t[8]=s,t[9]=M,t[10]=c,t[11]=f,t[12]=v,t[13]=b,t[14]=l,t[15]=m,t}
/**
       * Set a mat4 to the identity matrix
       *
       * @param {mat4} out the receiving matrix
       * @returns {mat4} out
       */function M(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}
/**
       * Transpose the values of a mat4
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the source matrix
       * @returns {mat4} out
       */function c(t,a){// If we are transposing ourselves we can skip a few steps but have to cache some values
if(t===a){var r=a[1],n=a[2],u=a[3],e=a[6],o=a[7],h=a[11];t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=r,t[6]=a[9],t[7]=a[13],t[8]=n,t[9]=e,t[11]=a[14],t[12]=u,t[13]=o,t[14]=h}else t[0]=a[0],t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=a[1],t[5]=a[5],t[6]=a[9],t[7]=a[13],t[8]=a[2],t[9]=a[6],t[10]=a[10],t[11]=a[14],t[12]=a[3],t[13]=a[7],t[14]=a[11],t[15]=a[15];return t}
/**
       * Inverts a mat4
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the source matrix
       * @returns {mat4 | null} out, or null if source matrix is not invertible
       */function f(t,a){var r=a[0],n=a[1],u=a[2],e=a[3],o=a[4],h=a[5],i=a[6],s=a[7],M=a[8],c=a[9],f=a[10],v=a[11],b=a[12],l=a[13],m=a[14],x=a[15],q=r*h-n*o,y=r*i-u*o,w=r*s-e*o,d=n*i-u*h,p=n*s-e*h,g=u*s-e*i,A=M*l-c*b,F=M*m-f*b,k=M*x-v*b,S=c*m-f*l,z=c*x-v*l,O=f*x-v*m,R=q*O-y*z+w*S+d*k-p*F+g*A;return R?(R=1/R,t[0]=(h*O-i*z+s*S)*R,t[1]=(u*z-n*O-e*S)*R,t[2]=(l*g-m*p+x*d)*R,t[3]=(f*p-c*g-v*d)*R,t[4]=(i*k-o*O-s*F)*R,t[5]=(r*O-u*k+e*F)*R,t[6]=(m*w-b*g-x*y)*R,t[7]=(M*g-f*w+v*y)*R,t[8]=(o*z-h*k+s*A)*R,t[9]=(n*k-r*z-e*A)*R,t[10]=(b*p-l*w+x*q)*R,t[11]=(c*w-M*p-v*q)*R,t[12]=(h*F-o*S-i*A)*R,t[13]=(r*S-n*F+u*A)*R,t[14]=(l*y-b*d-m*q)*R,t[15]=(M*d-c*y+f*q)*R,t):null}
/**
       * Calculates the adjugate of a mat4
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the source matrix
       * @returns {mat4} out
       */
/**
       * Calculates the determinant of a mat4
       *
       * @param {ReadonlyMat4} a the source matrix
       * @returns {Number} determinant of a
       */
function v(t){var a=t[0],r=t[1],n=t[2],u=t[3],e=t[4],o=t[5],h=t[6],i=t[7],s=t[8],M=t[9],c=t[10],f=t[11],v=t[12],b=t[13],l=t[14],m=a*o-r*e,x=a*h-n*e,q=r*h-n*o,y=s*b-M*v,w=s*l-c*v,d=M*l-c*b;// Calculate the determinant
return i*(a*d-r*w+n*y)-u*(e*d-o*w+h*y)+t[15]*(s*q-M*x+c*m)-f*(v*q-b*x+l*m)}
/**
       * Multiplies two mat4s
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the first operand
       * @param {ReadonlyMat4} b the second operand
       * @returns {mat4} out
       */function b(t,a,r){var n=a[0],u=a[1],e=a[2],o=a[3],h=a[4],i=a[5],s=a[6],M=a[7],c=a[8],f=a[9],v=a[10],b=a[11],l=a[12],m=a[13],x=a[14],q=a[15],y=r[0],w=r[1],d=r[2],p=r[3];return t[0]=y*n+w*h+d*c+p*l,t[1]=y*u+w*i+d*f+p*m,t[2]=y*e+w*s+d*v+p*x,t[3]=y*o+w*M+d*b+p*q,y=r[4],w=r[5],d=r[6],p=r[7],t[4]=y*n+w*h+d*c+p*l,t[5]=y*u+w*i+d*f+p*m,t[6]=y*e+w*s+d*v+p*x,t[7]=y*o+w*M+d*b+p*q,y=r[8],w=r[9],d=r[10],p=r[11],t[8]=y*n+w*h+d*c+p*l,t[9]=y*u+w*i+d*f+p*m,t[10]=y*e+w*s+d*v+p*x,t[11]=y*o+w*M+d*b+p*q,y=r[12],w=r[13],d=r[14],p=r[15],t[12]=y*n+w*h+d*c+p*l,t[13]=y*u+w*i+d*f+p*m,t[14]=y*e+w*s+d*v+p*x,t[15]=y*o+w*M+d*b+p*q,t}
/**
       * Translate a mat4 by the given vector
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to translate
       * @param {ReadonlyVec3} v vector to translate by
       * @returns {mat4} out
       */function l(t,a,r){var n,u,e,o,h,i,s,M,c,f,v,b,l=r[0],m=r[1],x=r[2];return a===t?(t[12]=a[0]*l+a[4]*m+a[8]*x+a[12],t[13]=a[1]*l+a[5]*m+a[9]*x+a[13],t[14]=a[2]*l+a[6]*m+a[10]*x+a[14],t[15]=a[3]*l+a[7]*m+a[11]*x+a[15]):(n=a[0],u=a[1],e=a[2],o=a[3],h=a[4],i=a[5],s=a[6],M=a[7],c=a[8],f=a[9],v=a[10],b=a[11],t[0]=n,t[1]=u,t[2]=e,t[3]=o,t[4]=h,t[5]=i,t[6]=s,t[7]=M,t[8]=c,t[9]=f,t[10]=v,t[11]=b,t[12]=n*l+h*m+c*x+a[12],t[13]=u*l+i*m+f*x+a[13],t[14]=e*l+s*m+v*x+a[14],t[15]=o*l+M*m+b*x+a[15]),t}
/**
       * Scales the mat4 by the dimensions in the given vec3 not using vectorization
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to scale
       * @param {ReadonlyVec3} v the vec3 to scale the matrix by
       * @returns {mat4} out
       **/function m(t,a,r){var n=r[0],u=r[1],e=r[2];return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*u,t[5]=a[5]*u,t[6]=a[6]*u,t[7]=a[7]*u,t[8]=a[8]*e,t[9]=a[9]*e,t[10]=a[10]*e,t[11]=a[11]*e,t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}
/**
       * Rotates a mat4 by the given angle around the given axis
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @param {ReadonlyVec3} axis the axis to rotate around
       * @returns {mat4} out
       */
/**
       * Rotates a matrix by the given angle around the X axis
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */
function x(t,a,r){var n=Math.sin(r),u=Math.cos(r),e=a[4],o=a[5],h=a[6],i=a[7],s=a[8],M=a[9],c=a[10],f=a[11];return a!==t&&(// If the source and destination differ, copy the unchanged rows
t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),// Perform axis-specific matrix multiplication
t[4]=e*u+s*n,t[5]=o*u+M*n,t[6]=h*u+c*n,t[7]=i*u+f*n,t[8]=s*u-e*n,t[9]=M*u-o*n,t[10]=c*u-h*n,t[11]=f*u-i*n,t}
/**
       * Rotates a matrix by the given angle around the Y axis
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */function q(t,a,r){var n=Math.sin(r),u=Math.cos(r),e=a[0],o=a[1],h=a[2],i=a[3],s=a[8],M=a[9],c=a[10],f=a[11];return a!==t&&(// If the source and destination differ, copy the unchanged rows
t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),// Perform axis-specific matrix multiplication
t[0]=e*u-s*n,t[1]=o*u-M*n,t[2]=h*u-c*n,t[3]=i*u-f*n,t[8]=e*n+s*u,t[9]=o*n+M*u,t[10]=h*n+c*u,t[11]=i*n+f*u,t}
/**
       * Rotates a matrix by the given angle around the Z axis
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to rotate
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */
/**
       * Creates a matrix from a vector translation
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, dest, vec);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {ReadonlyVec3} v Translation vector
       * @returns {mat4} out
       */
function y(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}
/**
       * Creates a matrix from a vector scaling
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.scale(dest, dest, vec);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {ReadonlyVec3} v Scaling vector
       * @returns {mat4} out
       */function w(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=a[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}
/**
       * Creates a matrix from a given angle around a given axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotate(dest, dest, rad, axis);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @param {ReadonlyVec3} axis the axis to rotate around
       * @returns {mat4} out
       */function d(t,r,n){var u,e,o,h=n[0],i=n[1],s=n[2],M=Math.sqrt(h*h+i*i+s*s);return M<a?null:(h*=M=1/M,i*=M,s*=M,u=Math.sin(r),o=1-(e=Math.cos(r)),// Perform rotation-specific matrix multiplication
t[0]=h*h*o+e,t[1]=i*h*o+s*u,t[2]=s*h*o-i*u,t[3]=0,t[4]=h*i*o-s*u,t[5]=i*i*o+e,t[6]=s*i*o+h*u,t[7]=0,t[8]=h*s*o+i*u,t[9]=i*s*o-h*u,t[10]=s*s*o+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}
/**
       * Creates a matrix from the given angle around the X axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotateX(dest, dest, rad);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */function p(t,a){var r=Math.sin(a),n=Math.cos(a);// Perform axis-specific matrix multiplication
return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}
/**
       * Creates a matrix from the given angle around the Y axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotateY(dest, dest, rad);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */function g(t,a){var r=Math.sin(a),n=Math.cos(a);// Perform axis-specific matrix multiplication
return t[0]=n,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=n,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}
/**
       * Creates a matrix from the given angle around the Z axis
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.rotateZ(dest, dest, rad);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {Number} rad the angle to rotate the matrix by
       * @returns {mat4} out
       */function A(t,a){var r=Math.sin(a),n=Math.cos(a);// Perform axis-specific matrix multiplication
return t[0]=n,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}
/**
       * Creates a matrix from a quaternion rotation and vector translation
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, dest, vec);
       *     let quatMat = mat4.create();
       *     mat4.fromQuat(quatMat, quat);
       *     mat4.multiply(dest, dest, quatMat);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat} q Rotation quaternion
       * @param {ReadonlyVec3} v Translation vector
       * @returns {mat4} out
       */function F(t,a,r){// Quaternion math
var n=a[0],u=a[1],e=a[2],o=a[3],h=n+n,i=u+u,s=e+e,M=n*h,c=n*i,f=n*s,v=u*i,b=u*s,l=e*s,m=o*h,x=o*i,q=o*s;return t[0]=1-(v+l),t[1]=c+q,t[2]=f-x,t[3]=0,t[4]=c-q,t[5]=1-(M+l),t[6]=b+m,t[7]=0,t[8]=f+x,t[9]=b-m,t[10]=1-(M+v),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}
/**
       * Creates a new mat4 from a dual quat.
       *
       * @param {mat4} out Matrix
       * @param {ReadonlyQuat2} a Dual Quaternion
       * @returns {mat4} mat4 receiving operation result
       */
/**
       * Returns the translation vector component of a transformation
       *  matrix. If a matrix is built with fromRotationTranslation,
       *  the returned vector will be the same as the translation vector
       *  originally supplied.
       * @param  {vec3} out Vector to receive translation component
       * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
       * @return {vec3} out
       */
function k(t,a){return t[0]=a[12],t[1]=a[13],t[2]=a[14],t}
/**
       * Returns the scaling factor component of a transformation
       *  matrix. If a matrix is built with fromRotationTranslationScale
       *  with a normalized Quaternion parameter, the returned vector will be
       *  the same as the scaling vector
       *  originally supplied.
       * @param  {vec3} out Vector to receive scaling factor component
       * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
       * @return {vec3} out
       */function S(t,a){var r=a[0],n=a[1],u=a[2],e=a[4],o=a[5],h=a[6],i=a[8],s=a[9],M=a[10];return t[0]=Math.sqrt(r*r+n*n+u*u),t[1]=Math.sqrt(e*e+o*o+h*h),t[2]=Math.sqrt(i*i+s*s+M*M),t}
/**
       * Returns a quaternion representing the rotational component
       *  of a transformation matrix. If a matrix is built with
       *  fromRotationTranslation, the returned quaternion will be the
       *  same as the quaternion originally supplied.
       * @param {quat} out Quaternion to receive the rotation component
       * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
       * @return {quat} out
       */function z(t,a){var n=new r(3);S(n,a);var u=1/n[0],e=1/n[1],o=1/n[2],h=a[0]*u,i=a[1]*e,s=a[2]*o,M=a[4]*u,c=a[5]*e,f=a[6]*o,v=a[8]*u,b=a[9]*e,l=a[10]*o,m=h+c+l,x=0;return m>0?(x=2*Math.sqrt(m+1),t[3]=.25*x,t[0]=(f-b)/x,t[1]=(v-s)/x,t[2]=(i-M)/x):h>c&&h>l?(x=2*Math.sqrt(1+h-c-l),t[3]=(f-b)/x,t[0]=.25*x,t[1]=(i+M)/x,t[2]=(v+s)/x):c>l?(x=2*Math.sqrt(1+c-h-l),t[3]=(v-s)/x,t[0]=(i+M)/x,t[1]=.25*x,t[2]=(f+b)/x):(x=2*Math.sqrt(1+l-h-c),t[3]=(i-M)/x,t[0]=(v+s)/x,t[1]=(f+b)/x,t[2]=.25*x),t}
/**
       * Decomposes a transformation matrix into its rotation, translation
       * and scale components. Returns only the rotation component
       * @param  {quat} out_r Quaternion to receive the rotation component
       * @param  {vec3} out_t Vector to receive the translation vector
       * @param  {vec3} out_s Vector to receive the scaling factor
       * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
       * @returns {quat} out_r
       */
/**
       * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, dest, vec);
       *     mat4.translate(dest, dest, origin);
       *     let quatMat = mat4.create();
       *     mat4.fromQuat(quatMat, quat);
       *     mat4.multiply(dest, dest, quatMat);
       *     mat4.scale(dest, dest, scale)
       *     mat4.translate(dest, dest, negativeOrigin);
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat} q Rotation quaternion
       * @param {ReadonlyVec3} v Translation vector
       * @param {ReadonlyVec3} s Scaling vector
       * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
       * @returns {mat4} out
       */
function O(t,a,r,n,u){// Quaternion math
var e=a[0],o=a[1],h=a[2],i=a[3],s=e+e,M=o+o,c=h+h,f=e*s,v=e*M,b=e*c,l=o*M,m=o*c,x=h*c,q=i*s,y=i*M,w=i*c,d=n[0],p=n[1],g=n[2],A=u[0],F=u[1],k=u[2],S=(1-(l+x))*d,z=(v+w)*d,O=(b-y)*d,R=(v-w)*p,T=(1-(f+x))*p,P=(m+q)*p,I=(b+y)*g,j=(m-q)*g,D=(1-(f+l))*g;return t[0]=S,t[1]=z,t[2]=O,t[3]=0,t[4]=R,t[5]=T,t[6]=P,t[7]=0,t[8]=I,t[9]=j,t[10]=D,t[11]=0,t[12]=r[0]+A-(S*A+R*F+I*k),t[13]=r[1]+F-(z*A+T*F+j*k),t[14]=r[2]+k-(O*A+P*F+D*k),t[15]=1,t}
/**
       * Calculates a 4x4 matrix from the given quaternion
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {ReadonlyQuat} q Quaternion to create matrix from
       *
       * @returns {mat4} out
       */function R(t,a){var r=a[0],n=a[1],u=a[2],e=a[3],o=r+r,h=n+n,i=u+u,s=r*o,M=n*o,c=n*h,f=u*o,v=u*h,b=u*i,l=e*o,m=e*h,x=e*i;return t[0]=1-c-b,t[1]=M+x,t[2]=f-m,t[3]=0,t[4]=M-x,t[5]=1-s-b,t[6]=v+l,t[7]=0,t[8]=f+m,t[9]=v-l,t[10]=1-s-c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}
/**
       * Generates a frustum matrix with the given bounds
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {Number} left Left bound of the frustum
       * @param {Number} right Right bound of the frustum
       * @param {Number} bottom Bottom bound of the frustum
       * @param {Number} top Top bound of the frustum
       * @param {Number} near Near bound of the frustum
       * @param {Number} far Far bound of the frustum
       * @returns {mat4} out
       */
/**
       * Generates a perspective projection matrix with the given bounds.
       * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
       * which matches WebGL/OpenGL's clip volume.
       * Passing null/undefined/no value for far will generate infinite projection matrix.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {number} fovy Vertical field of view in radians
       * @param {number} aspect Aspect ratio. typically viewport width/height
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum, can be null or Infinity
       * @returns {mat4} out
       */
function T(t,a,r,n,u){var e=1/Math.tan(a/2);if(t[0]=e/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=u&&u!==1/0){var o=1/(n-u);t[10]=(u+n)*o,t[14]=2*u*n*o}else t[10]=-1,t[14]=-2*n;return t}
/**
       * Alias for {@link mat4.perspectiveNO}
       * @function
       */t("ap",(function(t,a,r){var n=a[0],u=a[1],e=a[2],o=a[3],h=a[4],i=a[5],s=a[6],M=a[7],c=a[8],f=r[0],v=r[1],b=r[2],l=r[3],m=r[4],x=r[5],q=r[6],y=r[7],w=r[8];return t[0]=f*n+v*o+b*s,t[1]=f*u+v*h+b*M,t[2]=f*e+v*i+b*c,t[3]=l*n+m*o+x*s,t[4]=l*u+m*h+x*M,t[5]=l*e+m*i+x*c,t[6]=q*n+y*o+w*s,t[7]=q*u+y*h+w*M,t[8]=q*e+y*i+w*c,t}));var P=T;
/**
       * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
       * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
       * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
       * Passing null/undefined/no value for far will generate infinite projection matrix.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {number} fovy Vertical field of view in radians
       * @param {number} aspect Aspect ratio. typically viewport width/height
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum, can be null or Infinity
       * @returns {mat4} out
       */
/**
       * Generates a orthogonal projection matrix with the given bounds.
       * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
       * which matches WebGL/OpenGL's clip volume.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {number} left Left bound of the frustum
       * @param {number} right Right bound of the frustum
       * @param {number} bottom Bottom bound of the frustum
       * @param {number} top Top bound of the frustum
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum
       * @returns {mat4} out
       */
function I(t,a,r,n,u,e,o){var h=1/(a-r),i=1/(n-u),s=1/(e-o);return t[0]=-2*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*s,t[11]=0,t[12]=(a+r)*h,t[13]=(u+n)*i,t[14]=(o+e)*s,t[15]=1,t}
/**
       * Alias for {@link mat4.orthoNO}
       * @function
       */var j=t("p",I);
/**
       * Generates a orthogonal projection matrix with the given bounds.
       * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
       * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {number} left Left bound of the frustum
       * @param {number} right Right bound of the frustum
       * @param {number} bottom Bottom bound of the frustum
       * @param {number} top Top bound of the frustum
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum
       * @returns {mat4} out
       */function D(t,a,r,n,u,e,o){var h=1/(a-r),i=1/(n-u),s=1/(e-o);return t[0]=-2*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=s,t[11]=0,t[12]=(a+r)*h,t[13]=(u+n)*i,t[14]=e*s,t[15]=1,t}
/**
       * Generates a look-at matrix with the given eye position, focal point, and up axis.
       * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {ReadonlyVec3} eye Position of the viewer
       * @param {ReadonlyVec3} center Point the viewer is looking at
       * @param {ReadonlyVec3} up vec3 pointing up
       * @returns {mat4} out
       */function Z(t,r,n,u){var e,o,h,i,s,c,f,v,b,l,m=r[0],x=r[1],q=r[2],y=u[0],w=u[1],d=u[2],p=n[0],g=n[1],A=n[2];return Math.abs(m-p)<a&&Math.abs(x-g)<a&&Math.abs(q-A)<a?M(t):(f=m-p,v=x-g,b=q-A,e=w*(b*=l=1/Math.sqrt(f*f+v*v+b*b))-d*(v*=l),o=d*(f*=l)-y*b,h=y*v-w*f,(l=Math.sqrt(e*e+o*o+h*h))?(e*=l=1/l,o*=l,h*=l):(e=0,o=0,h=0),i=v*h-b*o,s=b*e-f*h,c=f*o-v*e,(l=Math.sqrt(i*i+s*s+c*c))?(i*=l=1/l,s*=l,c*=l):(i=0,s=0,c=0),t[0]=e,t[1]=i,t[2]=f,t[3]=0,t[4]=o,t[5]=s,t[6]=v,t[7]=0,t[8]=h,t[9]=c,t[10]=b,t[11]=0,t[12]=-(e*m+o*x+h*q),t[13]=-(i*m+s*x+c*q),t[14]=-(f*m+v*x+b*q),t[15]=1,t)}
/**
       * Generates a matrix that makes something look at something else.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {ReadonlyVec3} eye Position of the viewer
       * @param {ReadonlyVec3} target Point the viewer is looking at
       * @param {ReadonlyVec3} up vec3 pointing up
       * @returns {mat4} out
       */
/**
       * Subtracts matrix b from matrix a
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the first operand
       * @param {ReadonlyMat4} b the second operand
       * @returns {mat4} out
       */
function _(t,a,r){return t[0]=a[0]-r[0],t[1]=a[1]-r[1],t[2]=a[2]-r[2],t[3]=a[3]-r[3],t[4]=a[4]-r[4],t[5]=a[5]-r[5],t[6]=a[6]-r[6],t[7]=a[7]-r[7],t[8]=a[8]-r[8],t[9]=a[9]-r[9],t[10]=a[10]-r[10],t[11]=a[11]-r[11],t[12]=a[12]-r[12],t[13]=a[13]-r[13],t[14]=a[14]-r[14],t[15]=a[15]-r[15],t}
/**
       * Multiply each element of the matrix by a scalar.
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the matrix to scale
       * @param {Number} b amount to scale the matrix's elements by
       * @returns {mat4} out
       */
/**
       * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
       *
       * @param {ReadonlyMat4} a The first matrix.
       * @param {ReadonlyMat4} b The second matrix.
       * @returns {Boolean} True if the matrices are equal, false otherwise.
       */
function E(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]&&t[9]===a[9]&&t[10]===a[10]&&t[11]===a[11]&&t[12]===a[12]&&t[13]===a[13]&&t[14]===a[14]&&t[15]===a[15]}
/**
       * Returns whether or not the matrices have approximately the same elements in the same position.
       *
       * @param {ReadonlyMat4} a The first matrix.
       * @param {ReadonlyMat4} b The second matrix.
       * @returns {Boolean} True if the matrices are equal, false otherwise.
       */
/**
       * Alias for {@link mat4.multiply}
       * @function
       */
var N=t("a0",b),Q=_;
/**
       * Alias for {@link mat4.subtract}
       * @function
       */const V=Object.freeze(Object.defineProperty({__proto__:null,add:
/**
       * Adds two mat4's
       *
       * @param {mat4} out the receiving matrix
       * @param {ReadonlyMat4} a the first operand
       * @param {ReadonlyMat4} b the second operand
       * @returns {mat4} out
       */
function(t,a,r){return t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t[3]=a[3]+r[3],t[4]=a[4]+r[4],t[5]=a[5]+r[5],t[6]=a[6]+r[6],t[7]=a[7]+r[7],t[8]=a[8]+r[8],t[9]=a[9]+r[9],t[10]=a[10]+r[10],t[11]=a[11]+r[11],t[12]=a[12]+r[12],t[13]=a[13]+r[13],t[14]=a[14]+r[14],t[15]=a[15]+r[15],t},adjoint:function(t,a){var r=a[0],n=a[1],u=a[2],e=a[3],o=a[4],h=a[5],i=a[6],s=a[7],M=a[8],c=a[9],f=a[10],v=a[11],b=a[12],l=a[13],m=a[14],x=a[15],q=r*h-n*o,y=r*i-u*o,w=r*s-e*o,d=n*i-u*h,p=n*s-e*h,g=u*s-e*i,A=M*l-c*b,F=M*m-f*b,k=M*x-v*b,S=c*m-f*l,z=c*x-v*l,O=f*x-v*m;return t[0]=h*O-i*z+s*S,t[1]=u*z-n*O-e*S,t[2]=l*g-m*p+x*d,t[3]=f*p-c*g-v*d,t[4]=i*k-o*O-s*F,t[5]=r*O-u*k+e*F,t[6]=m*w-b*g-x*y,t[7]=M*g-f*w+v*y,t[8]=o*z-h*k+s*A,t[9]=n*k-r*z-e*A,t[10]=b*p-l*w+x*q,t[11]=c*w-M*p-v*q,t[12]=h*F-o*S-i*A,t[13]=r*S-n*F+u*A,t[14]=l*y-b*d-m*q,t[15]=M*d-c*y+f*q,t},clone:o,copy:h,create:e,decompose:function(t,a,r,n){a[0]=n[12],a[1]=n[13],a[2]=n[14];var u=n[0],e=n[1],o=n[2],h=n[4],i=n[5],s=n[6],M=n[8],c=n[9],f=n[10];r[0]=Math.sqrt(u*u+e*e+o*o),r[1]=Math.sqrt(h*h+i*i+s*s),r[2]=Math.sqrt(M*M+c*c+f*f);var v=1/r[0],b=1/r[1],l=1/r[2],m=u*v,x=e*b,q=o*l,y=h*v,w=i*b,d=s*l,p=M*v,g=c*b,A=f*l,F=m+w+A,k=0;return F>0?(k=2*Math.sqrt(F+1),t[3]=.25*k,t[0]=(d-g)/k,t[1]=(p-q)/k,t[2]=(x-y)/k):m>w&&m>A?(k=2*Math.sqrt(1+m-w-A),t[3]=(d-g)/k,t[0]=.25*k,t[1]=(x+y)/k,t[2]=(p+q)/k):w>A?(k=2*Math.sqrt(1+w-m-A),t[3]=(p-q)/k,t[0]=(x+y)/k,t[1]=.25*k,t[2]=(d+g)/k):(k=2*Math.sqrt(1+A-m-w),t[3]=(x-y)/k,t[0]=(p+q)/k,t[1]=(d+g)/k,t[2]=.25*k),t}
/**
       * Creates a matrix from a quaternion rotation, vector translation and vector scale
       * This is equivalent to (but much faster than):
       *
       *     mat4.identity(dest);
       *     mat4.translate(dest, dest, vec);
       *     let quatMat = mat4.create();
       *     mat4.fromQuat(quatMat, quat);
       *     mat4.multiply(dest, dest, quatMat);
       *     mat4.scale(dest, dest, scale)
       *
       * @param {mat4} out mat4 receiving operation result
       * @param {quat} q Rotation quaternion
       * @param {ReadonlyVec3} v Translation vector
       * @param {ReadonlyVec3} s Scaling vector
       * @returns {mat4} out
       */,determinant:v,equals:function(t,r){var n=t[0],u=t[1],e=t[2],o=t[3],h=t[4],i=t[5],s=t[6],M=t[7],c=t[8],f=t[9],v=t[10],b=t[11],l=t[12],m=t[13],x=t[14],q=t[15],y=r[0],w=r[1],d=r[2],p=r[3],g=r[4],A=r[5],F=r[6],k=r[7],S=r[8],z=r[9],O=r[10],R=r[11],T=r[12],P=r[13],I=r[14],j=r[15];return Math.abs(n-y)<=a*Math.max(1,Math.abs(n),Math.abs(y))&&Math.abs(u-w)<=a*Math.max(1,Math.abs(u),Math.abs(w))&&Math.abs(e-d)<=a*Math.max(1,Math.abs(e),Math.abs(d))&&Math.abs(o-p)<=a*Math.max(1,Math.abs(o),Math.abs(p))&&Math.abs(h-g)<=a*Math.max(1,Math.abs(h),Math.abs(g))&&Math.abs(i-A)<=a*Math.max(1,Math.abs(i),Math.abs(A))&&Math.abs(s-F)<=a*Math.max(1,Math.abs(s),Math.abs(F))&&Math.abs(M-k)<=a*Math.max(1,Math.abs(M),Math.abs(k))&&Math.abs(c-S)<=a*Math.max(1,Math.abs(c),Math.abs(S))&&Math.abs(f-z)<=a*Math.max(1,Math.abs(f),Math.abs(z))&&Math.abs(v-O)<=a*Math.max(1,Math.abs(v),Math.abs(O))&&Math.abs(b-R)<=a*Math.max(1,Math.abs(b),Math.abs(R))&&Math.abs(l-T)<=a*Math.max(1,Math.abs(l),Math.abs(T))&&Math.abs(m-P)<=a*Math.max(1,Math.abs(m),Math.abs(P))&&Math.abs(x-I)<=a*Math.max(1,Math.abs(x),Math.abs(I))&&Math.abs(q-j)<=a*Math.max(1,Math.abs(q),Math.abs(j))},exactEquals:E,frob:
/**
       * Returns Frobenius norm of a mat4
       *
       * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
       * @returns {Number} Frobenius norm
       */
function(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]+t[3]*t[3]+t[4]*t[4]+t[5]*t[5]+t[6]*t[6]+t[7]*t[7]+t[8]*t[8]+t[9]*t[9]+t[10]*t[10]+t[11]*t[11]+t[12]*t[12]+t[13]*t[13]+t[14]*t[14]+t[15]*t[15])},fromQuat:R,fromQuat2:function(t,a){var n=new r(3),u=-a[0],e=-a[1],o=-a[2],h=a[3],i=a[4],s=a[5],M=a[6],c=a[7],f=u*u+e*e+o*o+h*h;//Only scale if it makes sense
return f>0?(n[0]=2*(i*h+c*u+s*o-M*e)/f,n[1]=2*(s*h+c*e+M*u-i*o)/f,n[2]=2*(M*h+c*o+i*e-s*u)/f):(n[0]=2*(i*h+c*u+s*o-M*e),n[1]=2*(s*h+c*e+M*u-i*o),n[2]=2*(M*h+c*o+i*e-s*u)),F(t,a,n),t},fromRotation:d,fromRotationTranslation:F,fromRotationTranslationScale:function(t,a,r,n){// Quaternion math
var u=a[0],e=a[1],o=a[2],h=a[3],i=u+u,s=e+e,M=o+o,c=u*i,f=u*s,v=u*M,b=e*s,l=e*M,m=o*M,x=h*i,q=h*s,y=h*M,w=n[0],d=n[1],p=n[2];return t[0]=(1-(b+m))*w,t[1]=(f+y)*w,t[2]=(v-q)*w,t[3]=0,t[4]=(f-y)*d,t[5]=(1-(c+m))*d,t[6]=(l+x)*d,t[7]=0,t[8]=(v+q)*p,t[9]=(l-x)*p,t[10]=(1-(c+b))*p,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},fromRotationTranslationScaleOrigin:O,fromScaling:w,fromTranslation:y,fromValues:i,fromXRotation:p,fromYRotation:g,fromZRotation:A,frustum:function(t,a,r,n,u,e,o){var h=1/(r-a),i=1/(u-n),s=1/(e-o);return t[0]=2*e*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*e*i,t[6]=0,t[7]=0,t[8]=(r+a)*h,t[9]=(u+n)*i,t[10]=(o+e)*s,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*e*2*s,t[15]=0,t},getRotation:z,getScaling:S,getTranslation:k,identity:M,invert:f,lookAt:Z,mul:N,multiply:b,multiplyScalar:function(t,a,r){return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t[3]=a[3]*r,t[4]=a[4]*r,t[5]=a[5]*r,t[6]=a[6]*r,t[7]=a[7]*r,t[8]=a[8]*r,t[9]=a[9]*r,t[10]=a[10]*r,t[11]=a[11]*r,t[12]=a[12]*r,t[13]=a[13]*r,t[14]=a[14]*r,t[15]=a[15]*r,t}
/**
       * Adds two mat4's after multiplying each element of the second operand by a scalar value.
       *
       * @param {mat4} out the receiving vector
       * @param {ReadonlyMat4} a the first operand
       * @param {ReadonlyMat4} b the second operand
       * @param {Number} scale the amount to scale b's elements by before adding
       * @returns {mat4} out
       */,multiplyScalarAndAdd:function(t,a,r,n){return t[0]=a[0]+r[0]*n,t[1]=a[1]+r[1]*n,t[2]=a[2]+r[2]*n,t[3]=a[3]+r[3]*n,t[4]=a[4]+r[4]*n,t[5]=a[5]+r[5]*n,t[6]=a[6]+r[6]*n,t[7]=a[7]+r[7]*n,t[8]=a[8]+r[8]*n,t[9]=a[9]+r[9]*n,t[10]=a[10]+r[10]*n,t[11]=a[11]+r[11]*n,t[12]=a[12]+r[12]*n,t[13]=a[13]+r[13]*n,t[14]=a[14]+r[14]*n,t[15]=a[15]+r[15]*n,t},ortho:j,orthoNO:I,orthoZO:D,perspective:P,perspectiveFromFieldOfView:
/**
       * Generates a perspective projection matrix with the given field of view.
       * This is primarily useful for generating projection matrices to be used
       * with the still experiemental WebVR API.
       *
       * @param {mat4} out mat4 frustum matrix will be written into
       * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
       * @param {number} near Near bound of the frustum
       * @param {number} far Far bound of the frustum
       * @returns {mat4} out
       */
function(t,a,r,n){var u=Math.tan(a.upDegrees*Math.PI/180),e=Math.tan(a.downDegrees*Math.PI/180),o=Math.tan(a.leftDegrees*Math.PI/180),h=Math.tan(a.rightDegrees*Math.PI/180),i=2/(o+h),s=2/(u+e);return t[0]=i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=-(o-h)*i*.5,t[9]=(u-e)*s*.5,t[10]=n/(r-n),t[11]=-1,t[12]=0,t[13]=0,t[14]=n*r/(r-n),t[15]=0,t},perspectiveNO:T,perspectiveZO:function(t,a,r,n,u){var e=1/Math.tan(a/2);if(t[0]=e/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=u&&u!==1/0){var o=1/(n-u);t[10]=u*o,t[14]=u*n*o}else t[10]=-1,t[14]=-n;return t},rotate:function(t,r,n,u){var e,o,h,i,s,M,c,f,v,b,l,m,x,q,y,w,d,p,g,A,F,k,S,z,O=u[0],R=u[1],T=u[2],P=Math.sqrt(O*O+R*R+T*T);return P<a?null:(O*=P=1/P,R*=P,T*=P,e=Math.sin(n),h=1-(o=Math.cos(n)),i=r[0],s=r[1],M=r[2],c=r[3],f=r[4],v=r[5],b=r[6],l=r[7],m=r[8],x=r[9],q=r[10],y=r[11],// Construct the elements of the rotation matrix
w=O*O*h+o,d=R*O*h+T*e,p=T*O*h-R*e,g=O*R*h-T*e,A=R*R*h+o,F=T*R*h+O*e,k=O*T*h+R*e,S=R*T*h-O*e,z=T*T*h+o,// Perform rotation-specific matrix multiplication
t[0]=i*w+f*d+m*p,t[1]=s*w+v*d+x*p,t[2]=M*w+b*d+q*p,t[3]=c*w+l*d+y*p,t[4]=i*g+f*A+m*F,t[5]=s*g+v*A+x*F,t[6]=M*g+b*A+q*F,t[7]=c*g+l*A+y*F,t[8]=i*k+f*S+m*z,t[9]=s*k+v*S+x*z,t[10]=M*k+b*S+q*z,t[11]=c*k+l*S+y*z,r!==t&&(// If the source and destination differ, copy the unchanged last row
t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15]),t)},rotateX:x,rotateY:q,rotateZ:function(t,a,r){var n=Math.sin(r),u=Math.cos(r),e=a[0],o=a[1],h=a[2],i=a[3],s=a[4],M=a[5],c=a[6],f=a[7];return a!==t&&(// If the source and destination differ, copy the unchanged last row
t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),// Perform axis-specific matrix multiplication
t[0]=e*u+s*n,t[1]=o*u+M*n,t[2]=h*u+c*n,t[3]=i*u+f*n,t[4]=s*u-e*n,t[5]=M*u-o*n,t[6]=c*u-h*n,t[7]=f*u-i*n,t},scale:m,set:s,str:
/**
       * Returns a string representation of a mat4
       *
       * @param {ReadonlyMat4} a matrix to represent as a string
       * @returns {String} string representation of the matrix
       */
function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},sub:Q,subtract:_,targetTo:function(t,a,r,n){var u=a[0],e=a[1],o=a[2],h=n[0],i=n[1],s=n[2],M=u-r[0],c=e-r[1],f=o-r[2],v=M*M+c*c+f*f;v>0&&(M*=v=1/Math.sqrt(v),c*=v,f*=v);var b=i*f-s*c,l=s*M-h*f,m=h*c-i*M;return(v=b*b+l*l+m*m)>0&&(b*=v=1/Math.sqrt(v),l*=v,m*=v),t[0]=b,t[1]=l,t[2]=m,t[3]=0,t[4]=c*m-f*l,t[5]=f*b-M*m,t[6]=M*l-c*b,t[7]=0,t[8]=M,t[9]=c,t[10]=f,t[11]=0,t[12]=u,t[13]=e,t[14]=o,t[15]=1,t},translate:l,transpose:c},Symbol.toStringTag,{value:"Module"}));
/**
       * 3 Dimensional Vector
       * @module vec3
       */
/**
       * Creates a new, empty vec3
       *
       * @returns {vec3} a new 3D vector
       */
function X(){var t=new r(3);return r!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function Y(t){var a=t[0],r=t[1],n=t[2];return Math.sqrt(a*a+r*r+n*n)}
/**
       * Creates a new vec3 initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @returns {vec3} a new 3D vector
       */function U(t,a,n){var u=new r(3);return u[0]=t,u[1]=a,u[2]=n,u}function B(t,a,r){return t[0]=a[0]-r[0],t[1]=a[1]-r[1],t[2]=a[2]-r[2],t}
/**
       * Normalize a vec3
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a vector to normalize
       * @returns {vec3} out
       */
function C(t,a){var r=a[0],n=a[1],u=a[2],e=r*r+n*n+u*u;return e>0&&(//TODO: evaluate use of glm_invsqrt here?
e=1/Math.sqrt(e)),t[0]=a[0]*e,t[1]=a[1]*e,t[2]=a[2]*e,t}
/**
       * Calculates the dot product of two vec3's
       *
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {Number} dot product of a and b
       */function G(t,a){return t[0]*a[0]+t[1]*a[1]+t[2]*a[2]}
/**
       * Computes the cross product of two vec3's
       *
       * @param {vec3} out the receiving vector
       * @param {ReadonlyVec3} a the first operand
       * @param {ReadonlyVec3} b the second operand
       * @returns {vec3} out
       */function H(t,a,r){var n=a[0],u=a[1],e=a[2],o=r[0],h=r[1],i=r[2];return t[0]=u*i-e*h,t[1]=e*o-n*i,t[2]=n*h-u*o,t}
/**
       * 4 Dimensional Vector
       * @module vec4
       */
/**
       * Creates a new, empty vec4
       *
       * @returns {vec4} a new 4D vector
       */
function J(){var t=new r(4);return r!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}
/**
       * Creates a new vec4 initialized with the given values
       *
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {vec4} a new 4D vector
       */function K(t,a,n,u){var e=new r(4);return e[0]=t,e[1]=a,e[2]=n,e[3]=u,e}
/**
       * Copy the values from one vec4 to another
       *
       * @param {vec4} out the receiving vector
       * @param {ReadonlyVec4} a the source vector
       * @returns {vec4} out
       */
/**
       * Quaternion in the format XYZW
       * @module quat
       */
/**
       * Creates a new identity quat
       *
       * @returns {quat} a new quaternion
       */
function L(){var t=new r(4);return r!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}
/**
       * Sets a quat from the given angle and rotation axis,
       * then returns it.
       *
       * @param {quat} out the receiving quaternion
       * @param {ReadonlyVec3} axis the axis around which to rotate
       * @param {Number} rad the angle in radians
       * @returns {quat} out
       **/function W(t,a,r){r*=.5;var n=Math.sin(r);return t[0]=n*a[0],t[1]=n*a[1],t[2]=n*a[2],t[3]=Math.cos(r),t}
/**
       * Multiplies two quat's
       *
       * @param {quat} out the receiving quaternion
       * @param {ReadonlyQuat} a the first operand
       * @param {ReadonlyQuat} b the second operand
       * @returns {quat} out
       */function $(t,a,r){var n=a[0],u=a[1],e=a[2],o=a[3],h=r[0],i=r[1],s=r[2],M=r[3];return t[0]=n*M+o*h+u*s-e*i,t[1]=u*M+o*i+e*h-n*s,t[2]=e*M+o*s+n*i-u*h,t[3]=o*M-n*h-u*i-e*s,t}
/**
       * Performs a spherical linear interpolation between two quat
       *
       * @param {quat} out the receiving quaternion
       * @param {ReadonlyQuat} a the first operand
       * @param {ReadonlyQuat} b the second operand
       * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
       * @returns {quat} out
       */
/**
       * 2 Dimensional Vector
       * @module vec2
       */
/**
       * Creates a new, empty vec2
       *
       * @returns {vec2} a new 2D vector
       */
function tt(){var t=new r(2);return r!=Float32Array&&(t[0]=0,t[1]=0),t}t("ab",V),t("a4",B),t("ai",(function(t,a){var r=a[0]-t[0],n=a[1]-t[1],u=a[2]-t[2];return Math.sqrt(r*r+n*n+u*u)})),t("ac",Y),X(),J(),t("X",K),t("M",(function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t}
/**
       * Set the components of a vec4 to the given values
       *
       * @param {vec4} out the receiving vector
       * @param {Number} x X component
       * @param {Number} y Y component
       * @param {Number} z Z component
       * @param {Number} w W component
       * @returns {vec4} out
       */)),t("L",(function(t,a,r,n,u){return t[0]=a,t[1]=r,t[2]=n,t[3]=u,t}
/**
       * Normalize a vec4
       *
       * @param {vec4} out the receiving vector
       * @param {ReadonlyVec4} a vector to normalize
       * @returns {vec4} out
       */)),t("O",$),t("Z",(function(t,a){var r=a[0],n=a[1],u=a[2],e=a[3],o=r*r+n*n+u*u+e*e;return o>0&&(o=1/Math.sqrt(o)),t[0]=r*o,t[1]=n*o,t[2]=u*o,t[3]=e*o,t})),X(),U(1,0,0),U(0,1,0),L(),L(),u(),tt()}}}));

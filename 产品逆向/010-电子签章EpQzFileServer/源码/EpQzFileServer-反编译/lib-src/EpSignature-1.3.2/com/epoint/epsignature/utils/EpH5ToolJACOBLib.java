/*
 * Decompiled with CFR 0.152.
 */
package com.epoint.epsignature.utils;

import com.epoint.epsignature.asn1.dto.EpOFDData;
import com.epoint.epsignature.dzyyzz.bean.DZYYZZReq;
import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

public class EpH5ToolJACOBLib {
    public EpH5ToolJACOBLib() {
        EpH5ToolJACOBLib a;
    }

    public static void main(String[] a) {
        new EpH5ToolJACOBLib().initLicense(DZYYZZReq.J("b:z\u0014Y5\rRt5@\u0012aPn\u0017[Pm&u\u0018aS]\u001br\u0018[%@\u0012\\'\t\n[\u000fK\u000bw\u000br2iQ[[q\u000bO\u000ba:z\u0015Z*T7Y5\t\u000eq\bW\u001av\byPu\b[\u001au\u0018SVu\u0018uWt!r\u0015\\5r\u0011Y5v.b:T\u0018q\bW\u000bl7T*b\t\t u'\\&mQ~*mRT\u000buRj0j7r m4n i6j*l\t~'iRr\u0012m7L!bS~&a\tT2Y\tH\u001an*n\u0013]\u000fn,uP_Pv*z\u000evP\u0000\u0014[RWV]%\tPk6n(]6P1\\*b\u0003\\\u0018v:w5b\u001a\\6z,l5b\u0010w:j\u001bw%L']$z6j%j2a\u000b\u0000\u001bk'm\u0018b:aRl6b$v$P\u0010Z%vSlP\t1m%H(l6_RnRTQu\bv\u0010kSz.\\\u000eb\u0012v4\\*i\u000eP\u0016l\b\\8mQWVo5b(aQb\nsQP8w$n\u0016Y\t\t\u0018Z\tH.i:T(k\fa\u001aa\u000eP\u0013k\u0018i\u001bv&P%j&}\u0010u:H\u0012lQ[QY:m\u0018a\f_\u0010o$v3l\u000eiQl6n\u0016Y*PQk7j m7~!q\u000bO\u000bb:P\u0015Y:r\u000en%T\u0016b1qTu\u0018u\u001av\bu\u001aw&y\u001aw6[Su6y\u0011q\u000f\t\tv1qTq\bv\u000fu6i\u001ab5m\u0018b&i\u001av5j\u000eu&uQb&r\tu\b_Qu\b[\u001av6mRa\u0018T\u000fq\u000bO\u000b[P\u0001S[\u000fv\u000ej%~Ra1qTZ\fn\u0011Z*\b,u6a\u0015v\bqQu6uWw&u\u0018w3\f\u0018u\u0018}Pu\u0018}Vu&}Wv\u0018m\u001au#u\u001av\bq\u0015_8\u0000\u0015|3a(s\rb+P\u0014[,y3} z3y&_;\b#u+\u007f(y\r\u007f y(K\u0005\u000e/U\u0012wTh,\f\u0018]*J\u000bTUM\b\u0013\u0015V\u0018\u007f\u0003\u0000\bS\bt\u001a\u007fP\u0001\f|\u0006ZS\u0013\u0013\u000f3O\u001a\u00136\nPN\u001bi2}[q,\bWNMa\u0001l\u0006\u000eM_\u0018W6P\u0007k4AV\u000e8}Iu\u0005B\u0018P;R&Z\u0007i\r\u0000\u0013\u00015t\u000ea;~\u0007aQL\nt2@\n\u0000\nA[JU~\b@1Y/A\u001b[\tW&q\u0005UMn\u0016]/J\bZ\bO7h:\u000f:w+\u000f&M)\u000f\u0006N*\r\u0006qZ\t2K\u0018U\u0003p*y\u0005u y#\u007f#S\r|Q\u0017\u0014A\u0018v\u0010\u0001\u0004S-V;\r\u000eJ\u0015k\u0010\u0000\u0010t.h\u0001O'\u000f$Q,S0j*m.[0|[a\u0004H\u000bP.q7z,m \u000e+n\u0018H\u0006aVu\fk\u0012\f/\tQ}\u000fA\ro\u0017S\r\r7\\T|\u0003q&L,JV\u00176\u000eW\u000f,w\u0010z3`\u0003\b\bv&P\u0015W\u0001\t\u0003\\0`7kPv-T1\u000f(v'r\u0015\u0001/z1nTMSQVM.u\u0011t\u0004\\Rt6v8k\t\u0001\u0000\rUQP\\\u001aQ\u000bh\u0016T\u0005q\u000e]#h*\u000bVp(s/q \u00002\tZ\u000b\u0004IMw\u0013sTl.\u0000Sn4wVkS\n\tM\r\u0013)\u0017\u0011sQyZ\b)\f\bo\u0017W%B\u0006|8\u007fZ\u007f*N\u001ba!|Rz\u001bs\u0012QZZ.\u0013MZ1N\u0001y\u0015\u000f\u001as6s\u0006\u0000+r\u0010a\u0000_\rZ\u0005tMn(z\u0017PMt\u0016q)\n'NRZ![VT3W\u0003k$\\6z1\b$_\u0013y\u0015U5\u0001)\u000f2B2\u000eSM)o\u000f\u0001'o2`\ra+y2i+l\u0011N\u000eR,J\u000b\u0017\u001aU#}\u0012n\f|\u0016iQl\b^\u001aW1`\u0007\u0001Zv;]PH\u000f\u0013V\\\nbR_\u0004\t\u0010\u0000WH*_%PTI\b\t\nw\u0000Z8^It0jZu\nw\u0013Q/\u007f\u0007O[s\u0017K/\f\u0015\u007f\u0015n\u0013~\u0016R\u0015\tP[0O\u0017\u0017.T\u0007L5n\u001bZ)\n,\u000f\fU\u001b\fPt\u0004_MKR\u0017\fl$\u0013\u000fh-\u000e,Q\n\u000b\u0017a;T\u0000\r\u0005n\u001aP#R1a)L4j\u0015j'I7i)m \tMB!{\u0010O\u0014~\u000b\\+^)\u000f\u0003N:m$\u007f#`4I)H\u001b~'@-H\u000bk,L\u0006\fMs,@)\b\u0017\u0013\f\n+P(UIl#s\ti!\u000f\u0012wIV#r\u0004B*P;\u0001)\u0013Q{\u0006\n,\u000b\u0004z5h(a\u000fZU\u000f\b\u0000Qr3S+r\t|S[Q\u0013\u0010A6P\u0016iWO3|Wn\u0006Z6TMNViUa\u000fh\u0015\u000f.o\fQS|(A3m7J\u0000j3z\u0005z\u0011~Z{8\u000b\u0010P\u000bTU\u000b\u0004\b)V5]MM\u001a_\u0018O\r\u0000S\f0I/B L1l\tlT\u000e\u0012AR{#TIR\u0000k\u0001S.\u0017[n.S#[ \u0013\u0000s!i\u0004`$pPIMPWr\r\u007f'ZUO\u000eQ\u0018|\rh*BT\u000b\u0013\t$u\u0007u[S\u0005\u007fRK7i#u5P\u0010^\u0015YQ\u0017Uw(s:\b1_\u0001u-^\u0004a1yZ_QQ\u000eu#\b&I3^R\u000e\u0011\u007f2\u0013\u0018JW_Ri2k([\u0007V U\bA\u000fV\u000fN\u0005\u007fPa\thV\u000f1r\u0013Z[aSI-LVnTt\u0007k\b\u0013(~\u0016J\u0005l,v._/[UBPh\bS*\u0013#}\u0011H/\u00001K\u001a\u0013\u0011]%\t\u0003\b\u0004|4Z.y\bb\u001ar.l&M!O\u0014v4\\\u0010`\u0018\f R3h%H[R\u0014\u000b\u0014N&`\u0001{7\u007fMh(}\ts\u000ea+R Y \u0013\u0015^\u0013B1[%q+\f2pS[\u0015Q+\u0001$BUyZK\u0006\u000e\u0003\u00005\\+p\u000b\tR\t\u0000\r-I\u0007\u000f3\u0001$Z\u0000K:w\u0013\f\r{(U\u000b}*v\u0001hQ\t\u000bU\u0006y\u0015k\u0014J\u0005\\'\u0017.J\u0015][K/a\tYRa6u4l ]'\u000e\u0000}TM#\\R@1@8b\n`1v;{!TM\u0000\b_!v\u0016Z\u0010\rW\n+\b$s\u0007hV\u0017Zy3kZj\u000b\b'J\u0014\u000f\u0014LIw-kU\u000bUwMZ,Q\u0014@I\\\u0016\n8\n+J7\u000f\u0011Q[R\u0005b)o0I\u000f\u0017\u0010\u000eR\u000f\u0017b.`0m5[&\n2\u0013Wl\u0001p(\u000e2M\u000e\u007fMS7B'r\u001aM.\u0001\u0000\u000f\u000e}\u000fm'J\u0010k6h\u0000y5Z\u001bZ\u0014\f5O\u0014\u0013#P:z\u0011\u0013\fK\fOPS'|\u0015L\u000e\t\u0007S+U\u0014r0s#r7\u000bM\r6\fVo4tZI\t\u007f#}\u0005a8o\u0007n)|\u0007Z/H-\f)p,L:lS@Uu.^)[\bV\u001aW\u001a~\u0017Y\u0007HUP\u0006Q\u000b\r-p\u0000A!Z:`3k6\u007f;R\u0006\u000f\u0018\f\u001aQ#u:S!r\rwZw-{SI&_6{\u0005t*@ b\u000fU\u0018T0\u000fI\u0013!h\u0014^4{\u000bS&\b,h\u0017~\u0006b\u0003V\u0013^(\u000f\u0000\b'\f[N6\r&B\fk(\t\rY4\u0013&S3\u0013\u0016\u00010Y\u0018P-u%RM}\fu#"));
    }

    public String initLicense(String a) {
        String string = "";
        Dispatch dispatch = new ActiveXComponent(EpOFDData.J("\tj\u0019o\u000e\u001c\f\u0015x`r\u0016s`gc\fb~\u000b~g\u000f\u0014g\u001f|\u0014\f\u000b}\u0013r`}\u0011\u007fbs`\u000b\u0015")).getObject();
        string = Dispatch.call(dispatch, DZYYZZReq.J("\u000bV\u000bL.Q\u0001]\fK\u0007"), (Object)new Variant(a)).getString();
        System.out.println(Dispatch.get(dispatch, EpOFDData.J("c8T\tI.C")));
        System.out.println(Dispatch.get(dispatch, DZYYZZReq.J("}\u0010J/K\u0005")));
        System.out.println(string);
        return string;
    }
}



public class Transformer {

	double btod(String str){	//二进制到十进制的转换
		int k = str.indexOf("."),m=0;
		double p=0.0;
		if(k ==-1)
			k =str.length();
		for(int i =k-1;i>=0;i--){
			char c = str.charAt(i);
			int a =Integer.parseInt(""+c);
			p=p+(a*Math.pow(2, m));
			m++;
		}
		m=-1;
		for(int i =k+1;i<str.length();i++){
			char c = str.charAt(i);
			int a =Integer.parseInt(""+c);
			p=p+(a*Math.pow(2, m));
			m--;
		}
		return p;
	}
	
	double otod(String str){	//八进制到十进制的转换
		int k = str.indexOf("."),m=0;
		double p=0.0;
		if(k ==-1)
			k =str.length();
		for(int i =k-1;i>=0;i--){
			char c = str.charAt(i);
			int a =Integer.parseInt(""+c);
			p=p+(a*Math.pow(8, m));
			m++;
		}
		m=-1;
		for(int i =k+1;i<str.length();i++){
			char c = str.charAt(i);
			int a =Integer.parseInt(""+c);
			p=p+(a*Math.pow(8, m));
			m--;
		}
		return p;
	}
	
	double htod(String str){	//十六进制到十进制的转换
		int k = str.indexOf("."),m=0;
		double p=0.0;
		if(k ==-1)
			k =str.length();
		for(int i =k-1;i>=0;i--){
			char c = str.charAt(i);
			int a =Integer.parseInt(""+c);
			p=p+(a*Math.pow(16, m));
			m++;
		}
		m=-1;
		for(int i =k+1;i<str.length();i++){
			char c = str.charAt(i);
			int a =Integer.parseInt(""+c);
			p=p+(a*Math.pow(16, m));
			m--;
		}
		return p;
	}
}

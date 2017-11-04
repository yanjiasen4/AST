/*

这是一个计算类，用于普通运算中的各种运算，如2，8，10，16进制的符合运算，复合运算其原理用后缀表达式来实现*/
import java.util.*;

import java.lang.Math;

class Calculate {	//两个内部类来实现数据的存储，如同数据结构中的栈
	Utils util = new Utils();
	Transformer trans = new Transformer();
	
	public static double jiecheng(double number){	//阶乘运算
		int number1 = (int)number;
		double j=1;
		for(int i=1;i<=number1;i++)
			j=j*i;
		return j;
	}
	
	String trans (char exp[], char postexp[]){	//后缀表达式的翻译函数
		int i=0,j=0;boolean m=true;//m用来监视表达式是不有非法的运算符连着输入
		Utils.operator op = util.new operator();
		while(exp[j]!='\0'){
			switch (exp[j]){
			case '(':
				op.top++;
				op.data[op.top]=exp[j];
				j++;m= false;
				break;
			case ')':
				while (op.data[op.top]!='('){
					postexp[i++]=op.data[op.top];
					op.top--;
				}
				op.top--;
				j++;
				break;
			case '+':
			case '-':
				if(!m)
					return "+或者-附近出现多个运算符在一起的现象！";
				while (op.top!=-1 && op.data[op.top]!='('){
					postexp[i++]=op.data[op.top];
					op.top--;
				}
				op.top++;
				op.data[op.top]=exp[j];
				j++;m=false;
				break;
			case '*':
			case '/':
				if(!m)
					return "*或/附近出现多个运算符在一起的现象！";
				while(op.top!=-1 && op.data[op.top]!='('&& op.data[op.top]!='+'&& op.data[op.top]!='-'){
					postexp[i++]=op.data[op.top];
					op.top--;
				}
				op.top++;
				op.data[op.top]=exp[j];
				j++;m = false;
				break;
			case '^':
			if(!m)
				return "^(冥运算符号)附近出现多个运算符在一起的现象！";
			case 's':
			case 'c':
			case 't':
			case 'l':
			case '$':
			case '`':
				op.top++;
				op.data[op.top]=exp[j];
				j++;
				m = false;
				break;
			case '!':
				op.top++;
				op.data[op.top]=exp[j];
				j++;
				break;
			default:
				while (exp[j]>='0' && exp[j]<='9'||exp[j]=='.'){
					postexp[i++]=exp[j];
					j++;
				}
				postexp[i++]='#';
				m = true;
			}
		}
		while (op.top!=-1){
			postexp[i++]=op.data[op.top];
			op.top--;
		}
		postexp[i]='\0';
		if(exp[j-1]=='+'||exp[j-1]=='-'||exp[j-1]=='*'||exp[j-1]=='/'||exp[j-1]=='^')
			return "运算式后缀出现非正常运算符！";
		return "ok";
	}
	
	public double exp(double a, double b, char op) {
		double c = 0d;
		switch(op) {
		case '+':
			c = a + b;
			break;
		case '-':
			c = b - a;
			break;
		case '*':
			c = a * b;
			break;
		}
		return c;
	}
	
	String compvalue (char postexp[],int flag){	//后缀表达式运算，flag为进制
		String  ex = new String(postexp);
		StringTokenizer analy = new StringTokenizer(ex,"#+-`*/sclt!^$");
		Utils.operator1 st = util.new operator1();
		double d,a,b,c;
		int j=0;
		st.top=-1;
		while (postexp[j]!='\0'){
			switch (postexp[j]){
			case '+': case '-': case '*':
				a=st.data[st.top];
				st.top--;
				b=st.data[st.top];
				c=exp(a,b,postexp[j]);
				st.data[st.top]=c;
				break;
//			case '-':
//				a=st.data[st.top];
//				st.top--;
//				b=st.data[st.top];
//				c=b-a;
//				st.data[st.top]=c;
//				break;
//			case '*':
//				a=st.data[st.top];
//				st.top--;
//				b=st.data[st.top];
//				c=a*b;
//				st.data[st.top]=c;
//				break;
			case '/':
				a=st.data[st.top];
				st.top--;
				b=st.data[st.top];
				st.top--;
				if (a!=0){
					c=b/a;
					st.top++;
					st.data[st.top]=c;
				}else{
					return "输入错误，除数不能是零!请重新输入!";
				}
				break;
			case 's':
				a=st.data[st.top];
				c=Math.sin(Math.toRadians(a));
				st.data[st.top]=c;
				break;
			case 'c':
				a=st.data[st.top];
				c=Math.cos(Math.toRadians(a));
				st.data[st.top]=c;
				break;
			case 't':
				a=st.data[st.top];
				if(a%180 == 90||(-a)%180==90)
					return "tan函数值有误！";
				c=Math.tan(Math.toRadians(a));
				st.data[st.top]=c;
				break;
			case '!':
				a=st.data[st.top];
				c=jiecheng(a);
				st.data[st.top]=c;
				break;
			case 'l':
				a=st.data[st.top];
				if(a<=0)
					return "log的真数不能小于等于0";
				c=Math.log(a);
				st.data[st.top]=c;
				break;
			case '^':
				a=st.data[st.top];
				st.top--;
				b=st.data[st.top];
				c=Math.pow(b,a);
				st.data[st.top]=c;
				break;
			case '$':
				a=st.data[st.top];
				if(a<0)
					return "开方数不能小于0！";
				c=Math.sqrt(a);
				st.data[st.top]=c;
				break;
			case '`':
				a=st.data[st.top];
				c=0-a;
				st.data[st.top]=c;
				break;
			default:
				String str =analy.nextToken();//获取后缀表达式的数据
				if(flag == 2)
					d = trans.btod(str);
				else if(flag == 8)
					d = trans.otod(str);
				else if(flag == 10)
					d=Double.parseDouble(str);
				else
					d = trans.htod(str);
				while (postexp[j]>='0' && postexp[j]<='9'||postexp[j]=='.'){
					j++;
				}
				st.top++;
				st.data[st.top]=d;
				break;
			}
			j++;
		}
		return (String.valueOf(st.data[st.top]));
	}
	
	String check(char c[]){	//检查函数，用来检查运算式中的低级错误
		int k=0,i=0;
		if(c[0]=='+'||c[0]=='-'||c[0]=='^'||c[0]=='*'||c[0]=='/')
			return "表达式开始位置不对";
		while(c[k]!='\0'){
			if((c[k]>=39 && c[k]<='9'&&c[k]!=',') ||c[k]=='$'||c[k]=='!'||c[k]==' '
							||c[k]=='c'||c[k]=='s'||c[k]=='t'||c[k]=='^'||c[k]=='l'||c[k]=='`')
			{}else{
				return "输入含有非法的字符，请重新输入正确的数学表达式!";
			}
			if(c[k]=='(')
				i++;
			else if(c[k]==')')
				i--;
			k++;
		}
		if(i!=0){
			return "输入错误，没有相匹配的括弧!请重新输入!";
		}
		return "ok";
	}
//	double btod(String str){	//二进制到十进制的转换
//		int k = str.indexOf("."),m=0;
//		double p=0.0;
//		if(k ==-1)
//			k =str.length();
//		for(int i =k-1;i>=0;i--){
//			char c = str.charAt(i);
//			int a =Integer.parseInt(""+c);
//			p=p+(a*Math.pow(2, m));
//			m++;
//		}
//		m=-1;
//		for(int i =k+1;i<str.length();i++){
//			char c = str.charAt(i);
//			int a =Integer.parseInt(""+c);
//			p=p+(a*Math.pow(2, m));
//			m--;
//		}
//		return p;
//	}
//	
//	double otod(String str){	//八进制到十进制的转换
//		int k = str.indexOf("."),m=0;
//		double p=0.0;
//		if(k ==-1)
//			k =str.length();
//		for(int i =k-1;i>=0;i--){
//			char c = str.charAt(i);
//			int a =Integer.parseInt(""+c);
//			p=p+(a*Math.pow(8, m));
//			m++;
//		}
//		m=-1;
//		for(int i =k+1;i<str.length();i++){
//			char c = str.charAt(i);
//			int a =Integer.parseInt(""+c);
//			p=p+(a*Math.pow(8, m));
//			m--;
//		}
//		return p;
//	}
//	
//	double htod(String str){	//十六进制到十进制的转换
//		int k = str.indexOf("."),m=0;
//		double p=0.0;
//		if(k ==-1)
//			k =str.length();
//		for(int i =k-1;i>=0;i--){
//			char c = str.charAt(i);
//			int a =Integer.parseInt(""+c);
//			p=p+(a*Math.pow(16, m));
//			m++;
//		}
//		m=-1;
//		for(int i =k+1;i<str.length();i++){
//			char c = str.charAt(i);
//			int a =Integer.parseInt(""+c);
//			p=p+(a*Math.pow(16, m));
//			m--;
//		}
//		return p;
//	}
}
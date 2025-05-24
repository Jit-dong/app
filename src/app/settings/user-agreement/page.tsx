import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UserAgreementPage() {
  return (
    <div className="space-y-6">
      <Link href="/settings" passHref legacyBehavior>
        <Button variant="outline" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>用户协议</CardTitle>
           <CardDescription>最后更新日期：2024年5月15日</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4 text-sm">
                <p>欢迎您使用芯智 AI 助手（以下简称“本服务”）。</p>
                <p>请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。除非您已阅读并接受本协议所有条款，否则您无权使用本服务。</p>
                
                <h3 className="font-semibold text-md pt-2">一、服务说明</h3>
                <p>1.1 本服务是芯智科技（以下简称“我们”）向用户提供的AI驱动的电子元件规格和建议助手服务。</p>
                <p>1.2 您理解并同意，本服务仅为用户提供信息参考，我们不对信息的准确性、完整性、及时性或特定用途的适用性作任何明示或暗示的保证。所有芯片数据、AI建议等内容仅供参考，用户应自行核实并承担决策风险。</p>

                <h3 className="font-semibold text-md pt-2">二、用户行为规范</h3>
                <p>2.1 您在使用本服务过程中，必须遵循国家的相关法律法规，不得利用本服务从事任何违法违规行为。</p>
                <p>2.2 您不得利用本服务制作、复制、发布、传播含有下列内容的信息：</p>
                <p>(a) 反对宪法所确定的基本原则的；</p>
                <p>(b) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
                <p>...</p>
                
                <h3 className="font-semibold text-md pt-2">三、知识产权</h3>
                <p>3.1 我们在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归我们所有。</p>
                <p>3.2 您在使用本服务过程中上传、发布的内容，您保证对其拥有合法权利。若涉及第三方合法权利的，您应自行取得权利人的授权。</p>
                <p>...</p>

                <h3 className="font-semibold text-md pt-2">四、免责声明</h3>
                <p>4.1 您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。出现上述情况时，我们将努力在第一时间与相关单位配合，及时进行修复，但是由此给您造成的损失，我们在法律允许的范围内免责。</p>
                <p>4.2 本服务提供的AI建议基于现有技术和数据，可能存在不准确或不全面的情况。我们不对AI建议的准确性、可靠性、完整性、适用性以及由此产生的任何后果承担责任。</p>
                <p>...</p>

                <h3 className="font-semibold text-md pt-2">五、其他</h3>
                <p>5.1 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律。</p>
                <p>5.2 若您和我们之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交至我们所在地有管辖权的人民法院管辖。</p>
                <p>（以上为示例内容，请替换为实际协议）</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

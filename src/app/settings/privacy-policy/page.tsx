import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6">
      <Link href="/settings" passHref legacyBehavior>
        <Button variant="outline" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> 返回设置
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>隐私政策</CardTitle>
          <CardDescription>最后更新日期：2024年5月15日</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4 text-sm">
              <p>欢迎使用芯智 AI 助手！我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。</p>
              
              <h3 className="font-semibold text-md pt-2">一、我们如何收集和使用您的个人信息</h3>
              <p>我们会出于本政策所述的以下目的，收集和使用您的个人信息：</p>
              <p>1. 帮助您成为我们的用户：为了创建芯智账户，我们会收集您的手机号码或邮箱地址。</p>
              <p>2. 为您提供产品或服务：在您使用我们的芯片搜索、AI问答等功能时，我们会收集您的查询信息、设备信息（型号、操作系统版本、设备设置、唯一设备标识符）、日志信息。</p>
              <p>3. 个性化推荐：为了向您提供更符合您需求的芯片推荐和内容，我们可能会收集您的关注领域、历史搜索记录、行业职位等信息。</p>
              <p>4. 改进我们的产品与/或服务：我们可能会收集您使用我们产品与/或服务时的信息，并将其进行数据分析，以用于改善我们产品或服务。</p>

              <h3 className="font-semibold text-md pt-2">二、我们如何共享、转让、公开披露您的个人信息</h3>
              <p>我们不会与任何公司、组织和个人共享您的个人信息，但以下情况除外：</p>
              <p>1. 在获取明确同意的情况下共享；</p>
              <p>2. 我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息；</p>
              <p>...</p>
              
              <h3 className="font-semibold text-md pt-2">三、我们如何保护您的个人信息安全</h3>
              <p>我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。</p>
              <p>...</p>

              <h3 className="font-semibold text-md pt-2">四、您的权利</h3>
              <p>按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：</p>
              <p>1. 访问您的个人信息；</p>
              <p>2. 更正您的个人信息；</p>
              <p>3. 删除您的个人信息；</p>
              <p>...</p>

              <h3 className="font-semibold text-md pt-2">五、本政策如何更新</h3>
              <p>我们的隐私政策可能变更。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。</p>
              
              <h3 className="font-semibold text-md pt-2">六、如何联系我们</h3>
              <p>如果您对本隐私政策有任何疑问、意见或建议，通过以下方式与我们联系：</p>
              <p>电子邮箱：privacy@aispec.example.com</p>
              <p>（以上为示例内容，请替换为实际政策）</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

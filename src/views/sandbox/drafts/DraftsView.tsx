import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Edit3,
  Calendar,
  Plus,
  X,
  Eye,
  FileText,
  Search,
  Trash2,
  ArrowLeft,
  BookOpen,
  FileArchive,
  Save,
  Send,
} from "lucide-react";
import { DraftItem, DraftsRes } from "@/src/types";
import {
  delDraft,
  getDrafts,
  publish,
  updateDraft,
} from "@/src/service/dashboard/DashBoardService";

/**
 * 草稿箱视图组件 - 管理文章和日记草稿
 */
export function DraftsView() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "posts";
  const [activeTab, setActiveTab] = useState<"posts" | "diary">(tab);
  const [mode, setMode] = useState<"list" | "edit" | "add">("list");
  const [draftType, setDraftType] = useState<"posts" | "diary">("posts");
  const [drafts, setDrafts] = useState<DraftsRes | null>(null);
  const [loading, setLoading] = useState(true);

  // 编辑状态
  const [editingItem, setEditingItem] = useState<DraftItem | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // 搜索和筛选
  const [searchQuery, setSearchQuery] = useState("");

  // 加载草稿数据
  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      setLoading(true);
      const data = await getDrafts();
      setDrafts(data);
    } catch (error) {
      console.error("加载草稿失败:", error);
      // 使用模拟数据
      setDrafts({
        posts: {
          count: 0,
          items: [],
        },
        diary: {
          count: 0,
          items: [],
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // 获取当前标签页的草稿列表
  const getCurrentDrafts = (): DraftItem[] => {
    if (!drafts) return [];
    return activeTab === "posts" ? drafts.posts.items : drafts.diary.items;
  };

  // 筛选草稿
  const filteredDrafts = getCurrentDrafts().filter(
    (draft) =>
      draft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 添加标签
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  // 删除标签
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // 开始编辑
  const handleEdit = (item: DraftItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setContent(item.body);
    setCategory(item.category || "");
    setMood(item.mood || "");
    try {
      setTags(JSON.parse(item.tags || "[]"));
    } catch {
      setTags([]);
    }
    setMode("edit");
  };

  // 开始新增
  const handleAdd = (type: "posts" | "diary") => {
    setDraftType(type);
    setEditingItem(null);
    setTitle("");
    setContent("");
    setCategory("");
    setMood("");
    setTags([]);
    setMode("add");
  };

  // 保存草稿
  const handleSave = async () => {
    const newDraft: DraftItem = {
      id: editingItem?.id || `new-${Date.now()}`,
      filename: title.trim() ? `${title.trim()}.md` : "untitled.md",
      title: title || "无标题",
      created: editingItem?.created || new Date().toISOString().split("T")[0],
      updated: new Date().toISOString().split("T")[0],
      category: draftType === "posts" ? category : undefined,
      mood: draftType === "diary" ? mood : undefined,
      tags: JSON.stringify(tags),
      body: content,
      wordCount: content.length,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (drafts) {
      const updatedDrafts = { ...drafts };
      if (editingItem) {
        // 更新现有草稿
        const items = updatedDrafts[draftType].items.map((item) =>
          item.id === editingItem.id ? newDraft : item,
        );
        updatedDrafts[draftType] = { count: items.length, items };
      } else {
        // 新增草稿
        updatedDrafts[draftType].items = [
          newDraft,
          ...updatedDrafts[draftType].items,
        ];
        updatedDrafts[draftType].count += 1;
      }

      try {
        await updateDraft(newDraft);
        setDrafts(updatedDrafts);
      } catch (error) {
        console.error("保存失败", error);
      }
    }

    setMode("list");
    setEditingItem(null);
  };

  // 删除草稿
  const handleDelete = async (id: string) => {
    if (!drafts) return;
    if (!confirm("确定要删除这个草稿吗？此操作不可恢复。")) return;

    try {
      await delDraft(activeTab, id);
    } catch (error) {
      console.log("删除失败", error);
    }
    const updatedDrafts = { ...drafts };
    updatedDrafts[activeTab].items = updatedDrafts[activeTab].items.filter(
      (item) => item.id !== id,
    );
    updatedDrafts[activeTab].count -= 1;
    setDrafts(updatedDrafts);
  };

  //从草稿箱中发布
  const publishDraft = async () => {
    const newDraft: DraftItem = {
      id: editingItem?.id || `new-${Date.now()}`,
      filename: title.trim() ? `${title.trim()}.md` : "untitled.md",
      title: title || "无标题",
      created: editingItem?.created || new Date().toISOString().split("T")[0],
      updated: new Date().toISOString().split("T")[0],
      category: draftType === "posts" ? category : undefined,
      mood: draftType === "diary" ? mood : undefined,
      tags: JSON.stringify(tags),
      body: content,
      wordCount: content.length,
      createdAt: editingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await publish(draftType, editingItem.id);
    } catch (error) {
      console.log("发布失败");
    } finally {
      setMode("list");
      setEditingItem(null);
    }
  };

  // 列表模式
  if (mode === "list") {
    return (
      <div className="flex-1 overflow-y-auto p-8 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 页面头部 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                草稿箱
              </h2>
              <p className="text-primary/60 font-medium">
                管理您的文章和日记草稿
              </p>
            </div>
            {/* 标签切换 */}
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
              <button
                onClick={() => {
                  setActiveTab("posts");
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === "posts"
                    ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <FileText size={18} />
                <span>文章草稿</span>
                <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">
                  {drafts?.posts.count || 0}
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("diary");
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === "diary"
                    ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <BookOpen size={18} />
                <span>日记草稿</span>
                <span className="ml-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-full">
                  {drafts?.diary.count || 0}
                </span>
              </button>
            </div>
          </div>

          {/* 操作栏 */}
          <div className="material-card overflow-hidden">
            <div className="p-6 border-b border-primary/10 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="搜索草稿..."
                  className="search-input text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                />
              </div>
              <button
                onClick={() => handleAdd(activeTab)}
                className="btn-primary shadow-xl"
              >
                <Plus size={18} />
                <span>新增{activeTab === "posts" ? "文章" : "日记"}草稿</span>
              </button>
            </div>

            {/* 草稿列表 */}
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-slate-500">加载中...</p>
              </div>
            ) : filteredDrafts.length === 0 ? (
              <div className="p-12 text-center">
                <FileArchive
                  size={48}
                  className="mx-auto mb-4 text-slate-300"
                />
                <p className="text-slate-500 font-medium">暂无草稿</p>
                <button
                  onClick={() => handleAdd(activeTab)}
                  className="mt-4 text-primary hover:underline font-bold"
                >
                  创建第一个草稿
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-6 py-4">标题</th>
                      <th className="px-6 py-4">
                        {activeTab === "posts" ? "分类" : "心情"}
                      </th>
                      <th className="px-6 py-4">更新时间</th>
                      <th className="px-6 py-4">字数</th>
                      <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {filteredDrafts.map((draft) => (
                      <tr
                        key={draft.id}
                        className="hover:bg-primary/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                            {draft.title}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">
                            {activeTab === "posts"
                              ? draft.category || "未分类"
                              : draft.mood === "happy"
                                ? "开心"
                                : draft.mood === "excited"
                                  ? "兴奋"
                                  : draft.mood === "neutral"
                                    ? "平静"
                                    : draft.mood === "sad"
                                      ? "难过"
                                      : "普通"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                          {draft.updated}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                          {draft.wordCount}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(draft)}
                              className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                              title="编辑"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(draft.id)}
                              className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                              title="删除"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 编辑/新增模式
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 顶部操作栏 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <button
            onClick={() => setMode("list")}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            返回列表
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl border-2 border-primary/20 font-black text-primary hover:bg-primary/5 transition-all text-sm flex items-center gap-2"
            >
              <Save size={18} />
              保存草稿
            </button>
            <button
              className="btn-primary shadow-xl flex items-center gap-2"
              onClick={publishDraft}
            >
              <Send size={18} />
              发布
            </button>
          </div>
        </div>

        {/* 表单区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主表单 */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 space-y-8 shadow-sm">
              <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
                <Edit3 className="text-primary" size={24} />
                {mode === "add" ? "新建" : "编辑"}草稿
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    标题
                  </label>
                  <input
                    className="w-full bg-primary/5 border-none rounded-xl p-4 text-xl font-bold focus:ring-2 focus:ring-primary/40 focus:bg-primary/10 transition-all outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      draftType === "posts"
                        ? "请输入文章标题..."
                        : "请输入日记标题..."
                    }
                    type="text"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {draftType === "posts" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        分类
                      </label>
                      <select
                        className="w-full bg-primary/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 outline-none font-bold"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">选择分类</option>
                        <option value="教程">教程</option>
                        <option value="技术">技术</option>
                        <option value="随笔">随笔</option>
                        <option value="物理">物理</option>
                      </select>
                    </div>
                  )}
                  {draftType === "diary" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        心情
                      </label>
                      <select
                        className="w-full bg-primary/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 outline-none font-bold"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                      >
                        <option value="">选择心情</option>
                        <option value="happy">开心</option>
                        <option value="excited">兴奋</option>
                        <option value="neutral">平静</option>
                        <option value="sad">难过</option>
                      </select>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                      日期
                    </label>
                    <input
                      className="w-full bg-primary/5 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/40 outline-none font-bold"
                      type="date"
                      defaultValue={
                        editingItem?.created ||
                        new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 space-y-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
                  <FileText className="text-primary" size={24} />
                  内容
                </h3>
                <div className="flex gap-2">
                  <button
                    className="p-2 hover:bg-primary/10 rounded-lg text-slate-500 font-bold"
                    title="加粗"
                  >
                    B
                  </button>
                  <button
                    className="p-2 hover:bg-primary/10 rounded-lg text-slate-500 italic"
                    title="斜体"
                  >
                    I
                  </button>
                  <button
                    className="p-2 hover:bg-primary/10 rounded-lg text-slate-500 underline"
                    title="下划线"
                  >
                    U
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  className="w-full bg-primary/5 border-none rounded-xl p-6 focus:ring-2 focus:ring-primary/40 outline-none min-h-[500px] font-mono text-sm leading-relaxed"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={
                    draftType === "posts"
                      ? "在此输入 Markdown 内容..."
                      : "记录今天的故事..."
                  }
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {content.length} 字符
                </div>
              </div>
            </section>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-4">
                标签
              </h3>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-wider flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-primary/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-primary/40 outline-none font-bold text-sm"
                    placeholder="添加标签..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <button
                    onClick={addTag}
                    className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-primary/10 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary/80 border-b border-primary/10 pb-4">
                预览
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">标题</span>
                  <span className="font-bold">{title || "无标题"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">类型</span>
                  <span className="font-bold">
                    {draftType === "posts" ? "文章" : "日记"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">字数</span>
                  <span className="font-bold">{content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">标签</span>
                  <span className="font-bold">{tags.length}个</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DraftsView;
